import * as React from 'react';

import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
}
from 'react-native';
import FondoInicio from '../../assets/fondoInicio.png'
import Rectánguloconlogo from '../../assets/holi.png'
import Botoniniciar from '../../assets/BotonIniciar.png'
export default class SearchPage extends React.Component {
  _onSearchPressed = () => {
    this.props.navigation.navigate('Logins');
  };
  render() {
    return (
      <ImageBackground source={FondoInicio} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Image source={Rectánguloconlogo} style={styles.image} />
          <TouchableOpacity style={styles.FacebookStyle}  onPress={ this._onSearchPressed }>
            <Image source={Botoniniciar} style={styles.image1}/>
          </TouchableOpacity>
        </View  >
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
    width: '75%',
    height: '75%',
  },
  image1: {
    position: 'absolute',
    width: '80%',
    height: '80%',
  },

  FacebookStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    position: 'absolute',
    top: 400,
    height: 60,
    width: 220,

  },
});
