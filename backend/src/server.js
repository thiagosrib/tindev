const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');

const routes     = require('./routes');

const app        = express();
const server     = require('http').Server(app); // http = modulo padrao http do node -> .Server(xxx) = aceita tanto conexoes websocket qto http
const io         = require('socket.io')(server); // socket.io retorna uma funcao. a partir deste momento a aplicacao esta pronta para receber requisicao do websocket como do servidor http

const connectedUsers = {};

io.on('connection', socket => {
    // console.log('Nova coxexão', socket.id);

    // socket.on('hello', message => { // com este comando o server fica ouvindo uma requisicao do websocket e, caso encontrado, devolve uma mensagem
    //     console.log(message)
    // })
    const { user } = socket.handshake.query; // para obter o valor de match.params.id passado pelo frontend
    connectedUsers[user] = socket.id; // nao utilizar esta forma para aplicacoes em producao, o correto eh utilizar o banco para armazenar as informaoces
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-5iuzz.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);