var app = angular.module('app');

app.controller("ConfigSisCtrl", function ($scope, $http) {        


    var ip = "172.18.70.254";


    $scope.getNavbarValues = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");  
    }

    $scope.puntoPlato = function(){
        _puntos = document.getElementById("puntos").value;
        _tipo = document.getElementById("tipo").value;        
        
        axios.post("http://"+ip+":5000/configuraciones/puntosPlatillo", {
            puntos: _puntos,
            tipo: _tipo})
              .then((response) => {
                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.getPuntoPlato = function(){
      _tipo = document.getElementById("tipo").value;        
      
      axios.post("http://"+ip+":5000/configuraciones/verPuntosPlatillo", {
          tipo: _tipo})
            .then((response) => {
              console.log(response.data);
              $("#puntos").val(response.data[0].cantidadPuntos);               
            }, (error) => {
              console.log(error);
            });
  }

    $scope.puntoDesc = function(){
        _puntos = document.getElementById("puntos").value;
        _desc = document.getElementById("desc").value;
        
        
        axios.post("http://"+ip+":5000/configuraciones/puntosDescuento", {
            puntos: _puntos,
            colones: _desc})
              .then((response) => {
                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.getPuntoDesc = function () {      
      document.getElementById("userID").innerHTML = "Eid";

      
      var xmlhttp = new XMLHttpRequest();
      var tableData1 = [];
         
      xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              tableData1 = JSON.parse(this.responseText);
              console.log(tableData1);
              jQuery.each(tableData1, function (j, row) {
                console.log(row.Puntos);
                $("#puntos").val(row.Puntos);
                $("#desc").val(row.Colones);
              });
              //$("#puntos").val(tableData1.data[0].puntos);
          }
      };
      xmlhttp.open("GET", "http://"+ip+":5000/configuraciones/verPuntosDescuento", true);

      xmlhttp.send();
    }

    $scope.modiPerfil = function(){
        _nomb = 0;
        _apel = 0;
        _cor = 0;
        _tel = 0;
        _pro = 0;
        _pref = 0;
        
        if(document.getElementById("nomb").checked == true){
          _nomb = 1;
        }
        if(document.getElementById("apel").checked == true){
          _apel = 1;
        }
        if(document.getElementById("cor").checked == true){
          _cor = 1;
        }
        if(document.getElementById("tel").checked == true){
          _tel = 1;
        }
        if(document.getElementById("pro").checked == true){
          _pro = 1;
        }
        if(document.getElementById("pref").checked == true){
          _pref = 1;
        }
        
        console.log({nombre: _nomb, apellidos: _apel, correo: _cor, telefono: _tel, provincia: _pro, preferencias: _pref});
        
        axios.post("http://"+ip+":5000/configuraciones/adminModPerfil", {
            nombre: _nomb, 
            apellidos: _apel, 
            correo: _cor, 
            telefono: _tel, 
            provincia: _pro,
            preferencias: _pref})
              .then((response) => {
                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.getModiPerfil = function () {      
      document.getElementById("userID").innerHTML = "Eid";

      
      var xmlhttp = new XMLHttpRequest();
      var tableData1 = [];
         
      xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              tableData1 = JSON.parse(this.responseText);
              jQuery.each(tableData1, function (j, row) {
                console.log(row);
                document.getElementById("nomb").checked = row.nombre;
                document.getElementById("apel").checked = row.apellidos;
                document.getElementById("cor").checked = row.correo;
                document.getElementById("tel").checked = row.telefono;
                document.getElementById("pro").checked = row.provincia;
                document.getElementById("pref").checked = row.preferencias;
              });
          }
      };
      xmlhttp.open("GET", "http://"+ip+":5000/configuraciones/verAdminModPerfil", true);

      xmlhttp.send();
    }

    $scope.limiPlato = function(){
        _limite = document.getElementById("limite").value;

        console.log({limite: _limite});
        
        axios.post("http://"+ip+":5000/configuraciones/limitePlatos", {
          limite: _limite})
              .then((response) => {
                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.getLimiPlato = function () {      
      document.getElementById("userID").innerHTML = "Eid";

      
      var xmlhttp = new XMLHttpRequest();
      var tableData1 = [];
         
      xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              tableData1 = JSON.parse(this.responseText);
              jQuery.each(tableData1, function (j, row) {
                console.log(row);
                $("#limite").val(row.LimitePlatos);
              });
              //$("#puntos").val(tableData1.data[0].puntos);
          }
      };
      xmlhttp.open("GET", "http://"+ip+":5000/configuraciones/verLimitePlatos", true);

      xmlhttp.send();
    }
});