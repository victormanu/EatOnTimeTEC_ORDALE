import * as React from 'react';
import axios from 'axios';
import ReactTimeout from 'react-timeout'
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import IconHouse from '../../assets/house.png'
var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: "base1.db", createFromLocation: "~base1.db" });
var usuario1 = '';
var contraseña1 = '';

export default class SearchPage extends React.Component {
  static navigationOptions = {
    title: 'Principal',
  };
  constructor(props) {
    super(props);
    var hola="";
    this.nombreCompleto = []
    this.usuario = [];
    this.contraseña = [];
    this.filasAfectadas = 0;
    this.fila = 0;
    this.state = {
      searchStringUser: '',
      searchStringPassword: '',
      isLoading: false,
      password: '1234',
      userName: 'rafa',
      data: "",
      nombre: ""
    };
    axios.get('http://192.168.43.175:5000/usuarios')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.nombreCompleto.push(response.data[i].Nombre);
          this.usuario.push(response.data[i].Usuario);
          this.contraseña.push(response.data[i].Contraseña);

        }
      })
      .catch(error => {
        console.log(error);
      });
  }
 
  _insert = (nombre, usuario, contraseña) => {
    console.log("hola")
    db.transaction((tx) => {
      tx.executeSql('insert into tecnico(Nombre,Usuario,Contraseña) values(?,?,?)', [nombre, usuario, contraseña], querySuccess, errorCB);
    });
    querySuccess = (tx, results) => {
      console.log("good")
    }
    errorCB = (err) => {
      alert("Error processing SQL: " + err.code);
    }
    
  }

  _buscarUsuario = (nombreCompleto, usuario, contraseña) => {
      console.log(nombreCompleto, usuario, contraseña)

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM tecnico WHERE Usuario=? AND Contraseña=?", [usuario, contraseña], querySuccess, errorCB);
    });
    querySuccess = (tx, results) => {
      if (!(results.rows.length >= 1)) {
        this.filasAfectadas += 1;
        this.fila = 1;
        this._insert(nombreCompleto,usuario,contraseña);
      }
   
    };
    errorCB = (err) => {
      alert("Error processing SQL: " + err.code);
   
    }
    if (this.fila == 1) {
      console.log("tomeeeeeeeeeeeeeee")
     this._insert(nombreCompleto,usuario,contraseña);
     this.fila = 0;
    }
    else{
      console.log("hola")
      this.fila = 0;
    }
  }
  _getDataUsingGet = () => {
   
    //console.log("x=" + this.usuario.length);
    for ( x = 0; x < this.usuario.length; x++) {
      //console.log(this.nombreCompleto[x], this.usuario[x], this.contraseña[x])
      this._buscarUsuario(this.nombreCompleto[x], this.usuario[x], this.contraseña[x])
     // this._buscarUsuario(this.nombreCompleto[x], this.usuario[x], this.contraseña[x])
    }
    this.setState({ message: 'Contraseña incorrecta' + this.filasAfectadas });
    console.log("filas afectadas: " + this.filasAfectadas)
    this.nombreCompleto = [];
    this.usuario = [];
    this.contraseña = [];
    this.filasAfectadas = 0;
    //this.fila = 0;
//  this._getDataUsingGet ();
   // this._getDataUsingGet ();
  }
   

  _login = () => {
    db.transaction((tx) => {
      // tx.executeSql("SELECT * FROM tecnico WHERE Usuario='"+ this.state.searchStringUser+"' AND Contraseña='"+this.state.searchStringPassword+"'", [], querySuccess, errorCB);
      tx.executeSql("SELECT * FROM tecnico ", [], querySuccess, errorCB);
    });
    querySuccess = (tx, results) => {
      console.log(results.rows.length)
     // console.log(results.rows.item(0))
      
      if (results.rows.length >= 1 && this.state.searchStringUser != "" && this.state.searchStringPassword != "") {
        this.props.navigation.navigate('Home');
      } else {
        this.setState({ message: 'Contraseña incorrecta' });
      }
    }
    errorCB = (err) => {
      alert("Error processing SQL: " + err.code);
    }
  }
  

  _onSearchPressed = () => {
    if (
      this.state.searchStringUser == this.state.userName &&
      this.state.searchStringPassword == this.state.password
    ) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({ message: 'Contraseña incorrecta' });
    }
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
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Ingrese su usuario</Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Nombre de usuario"
            value={this.state.searchStringUser}
            onChange={this._onSearchTextChangedUser}
            placeholderTextColor="#656565"
          />
          <Text style={styles.description}>Ingrese su contraseña</Text>
          <TextInput
            underlineColorAndroid={'transparent'}
            secureTextEntry={true}
            keyboardType = "phone-pad"
            style={styles.searchInput}
            placeholder="Contraseña"
            value={this.state.searchStringPassword}
            onChange={this._onSearchTextChangedPassword}
            placeholderTextColor="#656565"
          />
          <Button
            onPress={this._login}
            color="#48BBEC"
            title="Confirmar"
          />
          <Button
            onPress={() =>this._getDataUsingGet()}
           
            color="#48BBEC"
            title="SINCORNIZAR"
          />
          <Button
            onPress={() => this._insert("santi", "san", "1234")}
            color="#48BBEC"
            title="hola"
          />
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
        <Text> {this.state.data}</Text>
        <Text> {"tecnico" + this.state.nombre}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565',
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
    color: '#48BBEC',
  },
});
