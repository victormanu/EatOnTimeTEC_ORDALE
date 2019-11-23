import * as React from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Image,
    TouchableOpacity,
    Button,
    Text,
}
    from 'react-native';
import FondoInicio from '../../assets/fondoInicio.png'
import Logo from '../../assets/logo.jpg'
import Menu from '../../assets/menu.png'
import Perfil from '../../assets/perfil.png'
import Amigos from '../../assets/amistad.png'
import Orden from '../../assets/orden1.png'
export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id1: this.props.navigation.state.params.id
        }
    }
    
    _onSearchPressed = () => {
        this.props.navigation.navigate('Logins',{id:this.state.id1})

    };
    _onSearchMenu = () => {
        this.props.navigation.navigate('Menus',{id:this.state.id1})

    };
    _onSearchPerfil = () => {
        this.props.navigation.navigate('Perfils',{id:this.state.id1})

    };
    _onSearchAmigos = () => {
        this.props.navigation.navigate('Amigoss',{id:this.state.id1})

    };
    _onSearchOrdenes = () => {
        this.props.navigation.navigate('Mis_Ordeness',{id:this.state.id1})

    };

    render() {

        return (
            <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
                <Image source={Logo} style={styles.image} />
                <TouchableOpacity style={styles.FacebookStyle} onPress={this._onSearchMenu}>
                    <Image source={Menu} style={styles.image1} />
                    <Text style={styles.titleText} >Menú</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.FacebookStyle1} onPress={this._onSearchPerfil}>
                    <Image source={Perfil} style={styles.image2} />
                    <Text style={styles.titleText1} >Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.FacebookStyle2} onPress={this._onSearchAmigos}>
                    <Image source={Amigos} style={styles.image3} />
                    <Text style={styles.titleText2} >Amigos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.FacebookStyle3} onPress={this._onSearchOrdenes}>
                    <Image source={Orden} style={styles.image4} />
                    <Text style={styles.titleText3} >Mis órdenes</Text>
                </TouchableOpacity>
                <View style={styles.flowRight2}>
                    <Button
                        style={styles.button1}
                        title="Cerrar sesión"
                        onPress={this._onSearchPressed}
                    />
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: -200,
    },
    image1: {
        flexDirection: 'row',
        resizeMode: 'contain',
        //  position: 'absolute',
        width: '80%',
        height: '80%',
        top: -10,
    },
    FacebookStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        //  position: 'absolute',
        top: 200,
        left: 20,
        height: 150,
        width: 150,
        //  backgroundColor: 'red',
        borderColor: "black"
    },

    image2: {
        flexDirection: 'row',
        resizeMode: 'contain',
        //  position: 'absolute',
        width: '80%',
        height: '80%',
        top: -10,
    },

    FacebookStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        position: 'absolute',
        top: 200,
        left: 190,
        height: 150,
        width: 150,
        //  backgroundColor: 'white',
        borderColor: "black"
    },
    image3: {
        flexDirection: 'row',
        resizeMode: 'contain',
        //  position: 'absolute',
        width: '80%',
        height: '80%',
        top: -10,
    },
    FacebookStyle2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        position: 'absolute',
        top: 370,
        left: 20,
        height: 150,
        width: 150,
        //  backgroundColor: 'yellow',
        borderColor: "black"
    },
    image4: {
        flexDirection: 'row',
        resizeMode: 'contain',
        //  position: 'absolute',
        width: '80%',
        height: '80%',
        top: -10,
    },
    FacebookStyle3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        position: 'absolute',
        top: 370,
        left: 190,
        height: 150,
        width: 150,
      
        borderColor: "black"
    },
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
    titleText: {
        top: 135,
        left: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
    titleText1: {
        top: 135,
        left: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
    titleText2: {
        top: 135,
        left: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
    titleText3: {
        top: 135,
        left: 23,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
    flowRight2: {
        position: 'absolute',
        top: 475,
        padding: 120,
        resizeMode: 'contain',
        color: '#656565'
    },
});