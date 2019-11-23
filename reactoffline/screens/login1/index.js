import * as React from 'react';
import axios from 'axios';
import {
    StyleSheet,
    ImageBackground,
    View,
    Image,
    TextInput,
    Button,
    Text,
}
    from 'react-native';
import FondoInicio from '../../assets/fondoInicio.png'
import Logo from '../../assets/logo.jpg'
import  ip from "../../configuration"
export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchStringUser: '',
            searchStringPassword: '',
            hidden: true,
            
        }
    
    }
    _onSearchPressed = () => {
        this.props.navigation.navigate('Registers');
    };
    _login = () => {

        
        axios.post(ip+"/login/user", {
            id: parseInt(this.state.searchStringUser),
            contra: this.state.searchStringPassword
        })
            .then((response) => {
                if (response.data.existe == 1 && response.data.rol == 1) {
                    this.props.navigation.navigate('Principals1');
                    this.state.searchStringPassword = ""
                    this.state.searchStringUser = ""
                    this.setState({ message: '' });
                }
                else {
                    this.setState({ message: 'Usuario no encontrado' });
                }
            }, (error) => {
                console.log(error);
            });
    };
    _onSearchTextChangedUser = event => {
        this.setState({
            searchStringUser: event.nativeEvent.text,
        });
    };
    _onSearchTextChangedPassword = event => {
        this.setState({
            searchStringPassword: event.nativeEvent.text,
        });
    };
    render() {
        return (
            <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
                <Image source={Logo} style={styles.image} />
                <View style={styles.flowRight1}>
                    <TextInput
                        placeholder='Ingrese su usuario Windows'
                        style={styles.searchInput}
                        onChange={this._onSearchTextChangedUser}
                        value={this.state.searchStringUser}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <View style={styles.flowRight}>
                    <TextInput
                        type={this.state.hidden}
                        placeholder='Ingrese su contraseña'
                        secureTextEntry={this.state.hidden}
                        style={styles.searchInput1}
                        onChange={this._onSearchTextChangedPassword}
                        value={this.state.searchStringPassword}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <Text style={styles.description2}>{this.state.message}</Text>
                <View style={styles.flowRight2}>
                    <Button
                        style={styles.button1}
                        title="Iniciar sesion"
                        onPress={this._login}
                    />
                    <Text style={styles.description}
                        onPress={this._onSearchPressed}>
                        Registro
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        top: -200,
        left: 40,
        position: 'absolute',
        resizeMode: 'contain',
        alignItems: 'center',
        width: '70%',
        height: '90%',
    },
    image1: {
        top: 110,
        right: 35,
        resizeMode: 'contain',
        position: 'absolute',
        width: '80%',
        height: '80%',
    },
    searchInput: {
        alignItems: 'center',
        height: 50,
        width: 250,
        fontSize: 18,
        borderBottomColor: '#2d2d2d',
        borderBottomWidth: 1,
        color: '#2d2d2d'
    },
    searchInput1: {
        alignItems: 'center',
        height: 50,
        width: 250,
        fontSize: 18,
        borderBottomColor: '#2d2d2d',
        borderBottomWidth: 1,
        color: '#2d2d2d'
    },
    flowRight2: {
        position: 'absolute',
        top: 425,
        padding: 110,
        resizeMode: 'contain',
        color: '#656565'
    },

    flowRight: {
        position: 'absolute',
        top: 350,
        flexDirection: 'column',
        padding: 40,
        resizeMode: 'contain',
        color: '#656565'
    },
    flowRight1: {
        position: 'absolute',
        top: 200,
        resizeMode: 'contain',
        flexDirection: 'column',
        padding: 40,
        color: '#656565'
    },
    description: {
        top: 5,
        padding: 40,
        color: 'blue'
    },
    description2: {
        top: 450,
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
    },
    icon: {
        top: 52,
        left: 300,
    },
});