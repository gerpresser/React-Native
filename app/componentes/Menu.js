import React from 'react';
import { View, Text, AppRegistry, StatusBar } from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


export default class MenuPadrao extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Navegacao />
      );
    }
}

//Tamanho do espaço da barra de status + 5 de margem
let tamanhoBarra = StatusBar.currentHeight;
    tamanhoBarra = tamanhoBarra + 5;

const Navegacao = () => (
    // You need to place a MenuContext somewhere in your application, usually at the root.
    // Menus will open within the context, and only one menu can open at a time per context.
    <MenuContext style={{ flex: 1 }}>
        <TopNavigation/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Hello!</Text></View>
    </MenuContext>
);

const TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'pink', paddingTop: tamanhoBarra }}>
        <View style={{ flex: 1 }}><Text>My App</Text></View>
        <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
        <MenuTrigger>
            <Text style={{ fontSize: 20 }}>CLIQUE AQUI</Text>
        </MenuTrigger>
        <MenuOptions>
            <MenuOption value={1}>
            <Text>One</Text>
            </MenuOption>
            <MenuOption value={2}>
            <Text>Two</Text>
            </MenuOption>
        </MenuOptions>
        </Menu>
    </View>
);