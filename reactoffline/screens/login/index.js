import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  PasswordInput,
}
  from 'react-native';

import { Item, Input, Icon, Label } from 'native-base';
import FondoInicio from '../../assets/fondoInicio.png'
import Rectánguloconlogo from '../../assets/holi.png'
import UsuarioClave from '../../assets/UsuarioClave.png'

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
      hidden: true,
      icon: "eye-off",
      password: true
    }
  }
  _onSearchPressed = () => {
    this.props.navigation.navigate('Home');

  };
  _changeIcon= () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      hidden: !prevState.hidden
    }));
  }

  render() {
    const { label, icon, onChange } = this.props;
    return (
      <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
         <Icon active name={icon} />
        <Icon style={styles.icon} name={this.state.icon} onPress={this._changeIcon} />
        <View style={styles.container}>
          <Image source={UsuarioClave} style={styles.image} />
        </View  >
        <View style={styles.flowRight}>
          <TextInput
            placeholder='Ingrese su usuario Windows'

            style={styles.searchInput}
            onChange={this._onSearchTextChanged}
            placeholderTextColor='#c5c5c5'

          />

        </View>
        <View style={styles.flowRight}>
          <TextInput
            type={this.state.hidden}
            placeholder='Ingrese su contraseña'
            secureTextEntry={this.state.hidden}
            style={styles.searchInput1}
            onChange={this._onSearchTextChanged}
            placeholderTextColor='#c5c5c5'

          />

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
    justifyContent: 'center',
    resizeMode: 'contain',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    height: 36,
    width: 320,
    fontWeight: '500',
    fontSize: 18,
    borderBottomColor: '#2d2d2d',
    borderBottomWidth: 1,
    color: '#2d2d2d'
  },
  searchInput1: {
    alignItems: 'center',
    height: 36,
    width: 320,
    fontWeight: '500',
    fontSize: 18,
    borderBottomColor: '#2d2d2d',
    borderBottomWidth: 1,
    color: '#2d2d2d'
  },
  flowRight: {
    position: 'absolute',
    top:350,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565'
  },
  icon: {
    top: 52,
    left: 300,
  
  },
});