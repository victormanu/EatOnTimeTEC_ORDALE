var app = angular.module('app');

app.controller("AdminCtrl", function ($scope, $http) {        

    var ip = "172.18.70.254";
    
    $scope.getNavbarValues = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
        axios.post("http://"+ip+":5000/perfil/user", {
                id: sessionStorage.getItem("Eid")
              })
              .then((response) => {
                $("#nomb").val(response.data.perfil[0].nombre);
                $("#apel").val(response.data.perfil[0].apellidos);
                $("#cor").val(response.data.perfil[0].correo);
                $("#tel").val(response.data.perfil[0].telefono);
                $("#pro").val(response.data.perfil[0].provincia);
                if(response.data.permisos[0].nombre == 0){
                  document.getElementById("nomb").disabled = true;  
                }
                if(response.data.permisos[0].apellidos == 0){
                  document.getElementById("apel").disabled = true;  
                }
                if(response.data.permisos[0].correo == 0){
                  document.getElementById("cor").disabled = true;  
                }
                if(response.data.permisos[0].telefono == 0){
                  document.getElementById("tel").disabled = true;  
                }
                if(response.data.permisos[0].provincia == 0){
                  document.getElementById("pro").disabled = true;  
                } 
              }, (error) => {
                console.log(error);
              });         
    }

    $scope.getNavbarValues2 = function () {      
      document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
    }
    

    $scope.editar = function(){
        _id = sessionStorage.getItem("Eid");
        nomb = document.getElementById("nomb").value;
        apel = document.getElementById("apel").value;
        cor = document.getElementById("cor").value;
        tel = document.getElementById("tel").value;
        pro = document.getElementById("pro").value;
        console.log({id: _id, nombre: nomb, apellidos: apel, correo: cor, telefono: tel, provincia: pro});
        
        axios.post("http://"+ip+":5000/perfil/modPerfilUsuario", {
            id: _id,
            nombre: nomb, 
            apellidos: apel, 
            correo: cor, 
            telefono: tel, 
            provincia: pro})
              .then((response) => {
                console.log(response.data); 
                location.href = "Administrador.html";              
              }, (error) => {
                console.log(error);
              });

    }

    $scope.darBaja = function(){
      _id = sessionStorage.getItem("Eid");
      
      
      axios.post("http://"+ip+":5000/perfil/cuentaBaja", {
          id: _id})
            .then((response) => {
              console.log(response.data);  
              location.href = "LogIn.html";             
            }, (error) => {
              console.log(error);
            });
    }
});
