import * as React from 'react';
import axios from 'axios';
import { ListItem } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
}
    from 'react-native';
import FondoInicio from '../../assets/fondoInicio.png'
import  ip from "../../configuration"
export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            showAlert: false,
            platos: "",
           id: this.props.navigation.state.params.id

        }
        
      
    
    
            axios.get(ip+'/menuComidaCliente/todosPlatillos')
            .then((response) => {
                console.log(response.data)
                this.setState({ list: response.data })
            })
            .catch(error => {
              console.log(error);
            });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        }
    _onSearchPressed = id => {
        console.log(id)
        console.log(this.state.list[id].name)
        console.log(this.state.list[id].subtitle)
        this.props.navigation.navigate('Logins');
    };
    hideAlert = () => {
        this.setState({ showAlert: false });
    };
    alert = id => {
        console.log(this.state.list[id].idOrden)
        axios.post(ip+"/ordenes/platillosOrdenes", {
            "id": this.state.list[id].idOrden
        })
            .then((response) => {
                var platillos="";
                for (let i = 0; i < response.data.length; i++) { 
                    platillos = platillos.concat(response.data[i].nombre+"         \n");
                }
                this.setState({ platos: platillos })
            }, (error) => {
                console.log(error);
            });
        this.setState({ showAlert: true });
    };
    render() {
        console.disableYellowBox = true;
        return (
            <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
                <Text style={styles.titleText} >Menú</Text>
                <View style={{ top: 90 }}>
                    {this.state.list.map((l, i) => (
                        <ListItem
                            onPress={() => this.alert(i)}
                            key={i}
                            leftAvatar={{ source: { uri: "https://icon-icons.com/icons2/131/PNG/128/catering_food_dinner_20584.png" } }}
                            title={"             " + l.NombrePlato}
                            bottomDivider
                           
                        />
                    ))
                    }
                </View>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title={"Platillos"}
                    message={this.state.platos}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    confirmButtonColor="#009975"
                    onCancelPressed={() => { this.hideAlert(); }}
                    onConfirmPressed={() => { this.hideAlert(); }}
                />
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
    titleText: {
        top: 40,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
});