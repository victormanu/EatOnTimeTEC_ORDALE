import * as React from 'react';
import { 
 Button,
 Text,
 TextInput,
 View,
 Image, 
 StyleSheet,
 ActivityIndicator } from 'react-native';
//import { Constants } from 'expo';
import IconHouse from '../../assets/house.png'

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    country: 'uk',
    pretty: 1,
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber,
    
  }

  data[key] = value

  const queryString = Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')

    return `https://api.nestoria.co.uk/api?${queryString}`
}

export default class SearchPage extends React.Component {
  static navigationOptions = {
    title: 'Buscador de propiedades'
  }

  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    }
  }

  _executeQuery = async (query) => {
    this.setState({isLoading: true})
    
    try {
      const response = await fetch(query)
      const json = await response.json()
      this._handleResponse(json.response)
    } catch(error) {
      
        this.setState({
          isLoading: false,
          message: `Ocurrió un error ${error}`
        })
      }
  }

  _handleResponse = (response) =>  {
    this.setState({
      isLoading: false,
      message: ''
    })

    if (response.application_response_code.substr(0,1) === '1') {
      this.props.navigation.navigate('Results', { listings: response.listings })
    } else {
      this.setState({message: 'No hay resultados, buscar de nuevo'})
    }
  }

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1)
    this._executeQuery(query)
  }

  _onSearchTextChanged = (event) => {
    this.setState({
      searchString: event.nativeEvent.text
    })
  }




  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size = 'large' /> : null
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Busca casas para comprar 
        </Text>    
        <Text style={styles.description}>
          Busca por nombre de lugar o por código postal
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder= 'Busca por nombre o código postal'
            value = {this.state.searchString}
            onChange = {this._onSearchTextChanged}
            placeholderTextColor = '#656565'
            
          />
          <Button
            onPress = {this._onSearchPressed}
            color='#48BBEC'
            title='Buscare'
            
            />
        </View>
        <Image source={IconHouse} style={styles.image} />
        {spinner}
        <Text style ={styles.description}>
          {this.state.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
    
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',   
    color: '#656565'
  },
  searchInput: {
    height: 36,
    padding: 4,
    margin: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'

  },
  image:{
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 158,
    height: 138,
  },

});
