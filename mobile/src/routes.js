import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// caso necessario permitir o usuario voltar nas navegacoes, no lugar de utilizar createSwitchNavigator
// utilizar createStackNavigator

// createBottomTabNavigator -> habilita a navegacao por abas na parte de baixo
// createMaterialTopTabNavigator
// createDrawerNavigator -> habilita navegacao pelo menu lateral

import Login from './pages/Login'
import Main  from './pages/Main'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);