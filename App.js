import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Login from './app/componentes/Login';
import Profile from './app/componentes/Profile';


// export const Aplicacao = createDrawerNavigator({
//  	Home: {
//  		screen: Login,
//  		navigationOptions: () => ({
//  			drawerLockMode: 'locked-closed',
//  			drawerLabel: () => null
//  		}),
//  	},
//  	Profile: { 
//  		screen: Profile
//  	},
// });

const Router = createStackNavigator(
	{
		Profile: {
			screen: Profile
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)

const SlideMenu = createDrawerNavigator({
    Home: {
        screen: Router
    }
})

export const Aplicacao = createStackNavigator(
	{
		Login: {
			screen: Login
		},
		Main: {
			screen: SlideMenu
		}
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}

)


export default class App extends React.Component {
	render() {
		return (
			<Aplicacao />
		);
	}
}