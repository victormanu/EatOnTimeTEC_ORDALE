import * as React from 'react';
import axios from 'axios';
import {
    StyleSheet,
    ImageBackground,
    View,
    TextInput,
    Button,
    Text,
    Picker,
    CheckBox,
}
from 'react-native';
import FondoInicio from '../../assets/fondoInicio.png'
import  ip from "../../configuration"
export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carne: false,
            pastas: false,
            vegetariana: false,
            ensaladas: false,
            nombre:"",
            apellidos:"",
            identificacion:"",
            correo:"",
            telefono:"",
            language:"San Jose",
            preferencias:""
        }
    }
    _onSearchPressed = () => {
        this.props.navigation.navigate('Logins');
    };
    checkBox_carne = () => {
        this.setState((prevState) => ({ carne: !prevState.carne }));
    }
    checkBox_pastas = () => {
        this.setState((prevState) => ({ pastas: !prevState.pastas }));
    }
    checkBox_vegetariana = () => {
        this.setState((prevState) => ({ vegetariana: !prevState.vegetariana }));
    }

    checkBox_ensaladas = () => {
        this.setState((prevState) => ({ ensaladas: !prevState.ensaladas }));
    }

    _login = () => {
        var car=this.state.carne
        this.setState({preferencias:""});
        this.state.ensaladas
        this.state.carne
        let String_1 = "" ;

 
        if (car==true){
            String_1 = String_1.concat( "Carne");
           
        }
         if (this.state.ensaladas==true){
            String_1 = String_1.concat( "Ensaladas");
         
        }
        if (this.state.pastas==true){
            String_1 = String_1.concat( "Pastas");
          
        }
        if (this.state.vegetariana==true){
            String_1 = String_1.concat( "Vegetariana");
           
        }
        axios.post(ip+"/registro/user", {
            "id": this.state.identificacion,
            "nombre": this.state.nombre,
            "apellidos":this.state.apellidos,
            "correo": this.state.correo,
            "telefono":  parseInt(this.state.telefono),
            "provincia": this.state.language,
            "preferencias": String_1
        })
            .then((response) => {
                console.log(response.data)

                this.props.navigation.navigate('Logins');

            }, (error) => {
                console.log(error);
            });
       

    };


    


      
    

   
    _onSearchTextChangedNombre = event => {
        this.setState({
            nombre: event.nativeEvent.text,
        });
    };
    _onSearchTextChangedApellidos = event => {
        this.setState({

            apellidos: event.nativeEvent.text,
        });
    };
    _onSearchTextChangedIdentificacion = event => {
        this.setState({
            identificacion: event.nativeEvent.text,
        });
    };
    _onSearchTextChangedCorreo = event => {
        this.setState({

            correo: event.nativeEvent.text,
        });
    };
    _onSearchTextChangedTelefono = event => {
        this.setState({

            telefono: event.nativeEvent.text,
        });
    };
    render() {
        console.disableYellowBox = true;
        return (

            <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
                <Text style={styles.titleText} >Registro</Text>

                <Text style={styles.titleText6} >Provincia</Text>
                <Text style={styles.titleText1} >Preferencias de tipo de comidas</Text>
                <Text style={styles.titleText2} >Carne</Text>
                <Text style={styles.titleText3} >Pastas</Text>
                <Text style={styles.titleText4} >Vegetarina</Text>
                <Text style={styles.titleText5} >Ensaladas</Text>
                <View style={styles.flowRight1}>
                    <TextInput
                        placeholder='Nombre'
                        style={styles.searchInput}
                        onChange={this._onSearchTextChangedNombre}
                        value={this.state.nombre}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <View style={styles.flowRight}>
                    <TextInput
                        placeholder='Apellidos'
                        style={styles.searchInput1}
                        onChange={this._onSearchTextChangedApellidos}
                        value={this.state.apellidos}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <View style={styles.flowRight3}>
                    <TextInput
                        placeholder='Identificacion'
                        style={styles.searchInput}
                        onChange={this._onSearchTextChangedIdentificacion}
                        value={this.state.identificacion}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <View style={styles.flowRight4}>
                    <TextInput
                        placeholder='Correo'
                       
                        style={styles.searchInput1}
                        onChange={this._onSearchTextChangedCorreo}
                        value={this.state.correo}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <View style={styles.flowRight5}>
                    <TextInput
                        placeholder='Telefono'
                        style={styles.searchInput}
                        onChange={this._onSearchTextChangedTelefono}
                        value={this.state.telefono}
                        placeholderTextColor='#c5c5c5'
                    />
                </View>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 190, top: 234, left: 110 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>
                    <Picker.Item label="San José" value="San Jose" />
                    <Picker.Item label="Alajuela" value="Alajuela" />
                    <Picker.Item label="Heredia" value="Heredia" />
                    <Picker.Item label="Cartago" value="Cartago" />
                    <Picker.Item label="Limón" value="Limon" />
                    <Picker.Item label="Guanacaste" value="Guanacaste" />
                    <Picker.Item label="Puntarenas" value="Puntarenas" />
                </Picker>



                <View style={styles.flowRight2}>


                    <CheckBox
                        style={{ top: -90, left: -75 }}
                        title='Click Here'
                        value={this.state.carne}
                        onChange={() => this.checkBox_carne()}
                    />
                    <CheckBox
                        style={{ top: -85, left: -75 }}
                        title='Click Here'
                        value={this.state.pastas}
                        onChange={() => this.checkBox_pastas()}
                    />
                    <CheckBox
                        style={{ top: -155, left: 50 }}
                        title='Click Here'
                        value={this.state.vegetariana}
                        onChange={() => this.checkBox_vegetariana()}
                    />
                    <CheckBox
                        style={{ top: -150, left: 50 }}
                        title='Click Here'
                        value={this.state.ensaladas}
                        onChange={() => this.checkBox_ensaladas()}
                    />
                    <View style={styles.flowRight7}>

                        <Button
                            style={styles.button1, { width: 400 }}
                            title="Registrarse"
                            onPress={() => this._login()}
                        />


                    </View>
                    <View style={styles.flowRight8}>

                        <Button
                            style={styles.button1, { width: 400 }}
                            title="Regresar"
                            onPress={this._onSearchPressed}
                        />


                    </View>
                </View>
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    container1: {
        flex: 1,

    },
    scrollView: {


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
        flexDirection: 'column',
        top: 500,
        padding: 110,
        //resizeMode: 'contain',
        color: 'red'
    },

    flowRight: {
        position: 'absolute',
        top: 125,
        flexDirection: 'column',
        padding: 40,
        resizeMode: 'contain',
        color: '#656565'
    },
    flowRight1: {
        position: 'absolute',
        top: 60,
        resizeMode: 'contain',
        flexDirection: 'column',
        padding: 40,
        color: '#656565'
    }, flowRight4: {
        position: 'absolute',
        top: 260,

        padding: 40,
        resizeMode: 'contain',
        flexDirection: 'column',
        color: '#656565'
    },
    flowRight3: {
        position: 'absolute',
        top: 195,
        resizeMode: 'contain',
        flexDirection: 'column',
        padding: 40,
        color: '#656565'
    },

    flowRight6: {
        position: 'absolute',
        top: 278,
        flexDirection: 'column',
        padding: 125,
        resizeMode: 'contain',
        color: '#656565'
    },
    flowRight5: {
        position: 'absolute',
        top: 330,
        resizeMode: 'contain',
        flexDirection: 'column',
        padding: 40,
        color: '#656565'
    },
    flowRight7: {

        top: - 160,
        width: 280,

        flexDirection: 'column',
        padding: 70,
        color: 'red'
    },
    flowRight8: {

        top: - 265,
        width: 140,

        flexDirection: 'column',
        left: -80,
        color: 'red'
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
    titleText: {
        top: 40,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText1: {
        top: 410,
        left: 40,
        fontSize: 17,


    },
    titleText2: {
        top: 425,
        left: 70,
        fontSize: 17,


    },
    titleText3: {
        top: 440,
        left: 70,
        fontSize: 17,


    },
    titleText4: {
        top: 378,
        left: 195,
        fontSize: 17,


    },
    titleText5: {
        top: 393,
        left: 195,
        fontSize: 17,


    },

    titleText6: {
        top: 382,
        left: 40,
        fontSize: 17,


    },
});