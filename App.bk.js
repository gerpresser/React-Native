import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './app/componentes/Login';
import Profile from './app/componentes/Profile';
import MenuPadrao from './app/componentes/Menu';


export const Aplicacao = createStackNavigator({
      Home: { screen: Login },
      Profile: { screen: Profile },
      //Profile: { screen: MenuPadrao },
    }, 
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false
      }
});


export default class App extends React.Component {
  render() {
    return (
      <Aplicacao />
    );
  }
}