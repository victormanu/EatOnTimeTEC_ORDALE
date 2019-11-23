var app = angular.module('app');

app.controller("GestionCuentaCtrl", function ($scope, $http) {        

    var ip = "172.18.70.254";

    $scope.getNavbarValues = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");  
    }


    $scope.buscar = function(){
        _id = document.getElementById("user").value;   
        
        $("#datos").empty();
        
        initial = '<label>Ingrese la identificación del usuario</label>'+
                '<input type="text" class="form-control" id="user">'+
                '<button type="button" ng-click="buscar()" class="btn btn-primary">Buscar</button><br>';
        $("#datos").append(initial);

        // aqui va la conexion
        /*nomb = "Fabricio";
        nombre = '<label>Nombre:</label><label id="nomb">' + nomb + 
                    '</label><br><label>Identificacion:</label><label id="id">' + _id + '</label><br>';
        $("#datos").append(nombre);*/

        console.log({id: _id});

        
        
        axios.post("http://"+ip+":5000/configuraciones/buscarBaja", {
            id: _id})
              .then((response) => {
                console.log(response.data);
                nombre = '<label>Nombre:</label><label id="nomb">' + response.data[0].nombre + 
                '</label><br><label>Identificacion:</label><label id="id">' + _id + '</label><br>';
                $("#datos").append(nombre);

                if(response.data[0].estado == true){
                  document.getElementById("reactivar").disabled = true;
                }
                else if(response.data[0].estado == false){
                  document.getElementById("myBtn").disabled = true;
                }

                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.reactivar = function(){
        _id = document.getElementById("id").textContent;        

        console.log({id: _id});
        
        axios.post("http://"+ip+":5000/configuraciones/reactivarCuenta", {
            id: _id})
              .then((response) => {
                console.log(response.data);               
              }, (error) => {
                console.log(error);
              });
    }

    $scope.darBaja = function(){
      _id = document.getElementById("id").textContent; 
      _motivo = document.getElementById("motivo").value;

      console.log({id: _id, motivo: _motivo});
      
      axios.post("http://"+ip+":5000/configuraciones/cuentaBaja", {
          id: _id,
          motivo: _motivo})
            .then((response) => {
              console.log(response.data);               
            }, (error) => {
              console.log(error);
            });
  }
});