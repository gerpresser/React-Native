import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image, Alert } from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            emailValido: false,
        }
    }


    componentDidMount() {
        this._carregarEstadoInicial().done();
    }

    _carregarEstadoInicial = async () => {

        var chave = await AsyncStorage.getItem('chave');
        var nome = await AsyncStorage.getItem('nome');

        if (chave !== null && nome !== null) {
            this.props.navigation.navigate('Profile');
        }

    }


    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

                <View style={styles.logoContainer}>
                    <Image source={require('../img/logo.png')} />
                </View>

                <View style={styles.container}>
    
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="E-mail"
                        placeholderTextColor="#FFF"
                        returnKeyType="next"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.senhaInput.focus()}
                        onChangeText={(text) => this.validate(text)}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Senha"
                        placeholderTextColor="#FFF"
                        secureTextEntry
                        returnKeyType="go"
                        ref={(input) => this.senhaInput = input}
                        value={this.state.senha}
                        onChangeText={(senha) => this.setState({ senha })}
                    />

                    <TouchableOpacity style={styles.botaoContainer} onPress={this.login}>
                        <Text style={styles.botaoTexto}>Entrar</Text>
                    </TouchableOpacity >

                </View>


            </KeyboardAvoidingView>
        );
    }


    login = () => {

        if (this.state.email === '' || this.state.senha === '') {
            Alert.alert(
                'Ops!',
                'O e-mail e senha são obrigatórios!'
            );
            return;
        }

        if (this.state.email !== '' && this.state.emailValido === false) {
            Alert.alert(
                'Ops!',
                'O e-mail informado é inválido!'
            );
            return;
        }

        fetch('http://206.189.207.220/v1/rest.php?email=' + this.state.email + '&senha=' + this.state.senha + '')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.id !== null) {
                    AsyncStorage.setItem('chave', JSON.stringify(responseJson.id));
                    AsyncStorage.setItem('nome', responseJson.nome);
                    this.props.navigation.navigate('Profile');
                } else {
                    alert('Usuário ou senha inválidos!');
                }
            })
            .catch((error) => {
                alert(error);
                throw error;
            });

    }

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(text) === false) {
            this.setState({ emailValido: false })
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ emailValido: true })
            this.setState({ email: text })
        }
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        padding: 20,
        backgroundColor: '#3498db',
    },
    input: {
        height: 50,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    botaoContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },
    botaoTexto: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: '700',
    },
    logoContainer: {
        backgroundColor: '#3498db',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
});