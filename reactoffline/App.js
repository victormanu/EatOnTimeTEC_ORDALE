import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
//import { Constants } from 'expo';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import Login from './screens/login1';
import SearchPage from './screens/search-page';
import SearchResults from './screens/search-results';
import Principal from './screens/vista-principal';
import Register from './screens/register-page';
import Principal1 from './screens/vista_principal';
import Inicio from "./screens/inicio";
import Perfil from "./screens/perfil";
import Mis_Ordenes from "./screens/mis_Ordenes";
console.disableYellowBox = true;
//var SQLite = require('react-native-sqlite-storage')
const MainNavigator = createStackNavigator({

  Mis_Ordeness: { screen: Mis_Ordenes,navigationOptions: {
    header: null,  
  }},
  Logins: { screen: Login,navigationOptions: {
    header: null,
  }},
  Principals1:{screen:Principal1,navigationOptions: {
    header: null,
  }},
  Inicios:{screen:Inicio,navigationOptions: {
    header: null,
  }}, 
  Perfils: { screen: Perfil,navigationOptions: {
    header: null,
    
  }},
  Registers: { screen: Register,navigationOptions: {
    header: null,
  }},
  Home: { screen: SearchPage },
  Principals: { screen: Principal },
  
  Logins: { screen: Login,navigationOptions: {
    header: null,
  }},
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});

const App = createAppContainer(MainNavigator);
export default App;
