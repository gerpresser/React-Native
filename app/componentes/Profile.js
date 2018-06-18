import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nomeLogado: '', loading: true };
    }

    static navigationOptions = {
        drawerLabel: 'Profile'
    };

    async componentWillMount() {

        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'FontAwesome': require('native-base/Fonts/FontAwesome.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
            'MaterialIcons': require('native-base/Fonts/MaterialIcons.ttf'),
        });

        const nomeAsync = await AsyncStorage.getItem('nome');

        if (nomeAsync) {
            this.setState({ nomeLogado: nomeAsync });
        } else {
            this.setState({ nomeLogado: '' });
        }

        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //       var crd = position.coords;
        //       alert(crd.latitude);
        //       alert(crd.longitude);
        //     },
        //     (error) => {
        //       if (error.code === 1) {
        //         alert('gps off');
        //       }
        //     },
        //     {enableHighAccuracy: false, timeout: 10000},
        //   )

        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (

            <View style={{ flex: 1 }}>

                <Header
                    backgroundColor={'#006aa9'}
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginBottom: -8 }}>
                            <Icon name="menu" type="FontAwesome" color="#fff" size={35} />
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: 'Ligado', style: { color: '#fff', fontFamily: "Roboto", fontWeight: 'bold', fontSize: 20, marginBottom: -3, marginLeft: -8 }
                    }}
                    rightComponent={
                        <IconBadge
                            MainElement={
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginBottom: -5 }}>
                                    <Icon
                                        name='ellipsis-v'
                                        type='font-awesome'
                                        color='#fff' 
                                        size={25}
                                    />
                                </TouchableOpacity>
                            }
                            BadgeElement={
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Text style={{ color: '#333', fontWeight: 'bold' }}>3</Text>
                                </TouchableOpacity>    
                            }
                            IconBadgeStyle={
                                {
                                    width: 10,
                                    height: 20,
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    marginTop: -8,
                                    marginLeft: -15,
                                }
                            }
                            Hidden={this.state.BadgeCount == 0}
                        />
                    }
                />

                <View style={styles.container}>
                
                    <Text style={styles.text}> Bem-vindo, {this.state.nomeLogado}  </Text>

                    <TouchableOpacity style={styles.botaoContainer} onPress={this.logout}>
                        <Text style={styles.botaoTexto}>Sair</Text>
                    </TouchableOpacity >

                </View>

            </View>


        );
    }

    logout = () => {

        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
        this.props.navigation.navigate('Login');

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#73c9ff',
        paddingHorizontal: 15,
        paddingVertical: 30,
        marginVertical: -5,
    },
    resetaBorda: {
        borderBottomColor: '#333',
    },
    text: {
        fontSize: 20,
        marginBottom: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botaoContainer: {
        backgroundColor: '#006aa9',
        paddingVertical: 15,
    },
    botaoTexto: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: '700',
    },
});