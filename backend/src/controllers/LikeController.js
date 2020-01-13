const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {
        const { user }  = request.headers;
        const { devId } = request.params;

        const loggedDev = await Dev.findById(user);
        if (!loggedDev) {
            return response.status(400).json({ error: 'User not exists. Please Sign up.' });
        }

        const targedDev = await Dev.findById(devId);
        if (!targedDev) {
            return response.status(400).json({ error: 'Dev not exists' });
        }

        if (targedDev.likes.includes(loggedDev._id)) {
            console.log('Deu match!!!');
            const loggedSocket = request.connectedUsers[user];
            const targedSocket = request.connectedUsers[devId];

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('match', targedDev);
            }

            if (targedSocket) {
                request.io.to(targedSocket).emit('match', loggedDev);
            }
        }

        console.log(`${loggedDev.name} deu like em ${targedDev.name}`);
        loggedDev.likes.push(targedDev._id);
        await loggedDev.save();

        // return response.json({toLike: devId, user: user});
        return response.json(loggedDev);
    }
};