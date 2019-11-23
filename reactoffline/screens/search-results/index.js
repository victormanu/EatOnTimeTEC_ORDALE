import React, {Component}  from 'react';
import {
  TouchableHighlight, 
  Text,
  View,
  StyleSheet,
  Image,
  FlatList } from 'react-native';
//sólo se renderea si las propiedades que se le pasan cambian, no tiene estado
class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index)
  }
  render () {
    const { item } = this.props
    const price = item.price_formatted.split(' ')[0]
    
    
    return (
      <TouchableHighlight underlayColor = '#dddddd'
        onPress = {this._onPress}>
        <View style = {styles.rowContainer}>
        <Image style = {styles.thumbnail} source = {{ uri : item.img_url }} />
          <View style = {styles.textContainer}>
            <Text styles = {styles.price}> {price}</Text>
            <Text styles = {styles.title} numberOflLines = {1}> {item.title}</Text>
          </View>
          <View style = {styles.separator}>
          </View>
        </View>
      </TouchableHighlight>
      
    )
  }
}

export default class SearchResults extends React.Component {
  static navigationOptions = {
    title: 'Resultados'
  }

  _keyExtrator = (item, index) => index.toString()

  _onPressItem = () => {

  }

  _renderItem = ({ item, index }) => {
    return ( 
      <ListItem
        item = {item}
        index = {index}
        onPressItem = {this._onPressItem}
      />
    )
  }

  render() {
    const { params } = this.props.navigation.state

    return (
      <FlatList 
      data={params.listings} 
      keyExtractor={this._keyExtrator}
      renderItem={this._renderItem} 
      />
      
    );
}

}

const styles = StyleSheet.create({

  thumbnail : {
    width: 80,
    height: 80,
    marginRight :10
  },
  textContainer : {
    flex: 1,
  },
  separator : {
    height: 1,
    backgroundColor: "#dddddd"
  },
  price : {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#488BEC"
  },
  title : {
    fontSize: 20,
    color: "#656565"
  },
  rowContainer : {
    flexDirection: 'row',
    padding: 10
  }

});