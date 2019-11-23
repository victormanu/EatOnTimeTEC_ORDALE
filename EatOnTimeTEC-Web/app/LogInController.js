var app = angular.module('app');

app.controller("myLogInCtrl", function ($scope) {

    $scope.userID;
    $scope.userPassword;
    
    var ip = "172.18.73.24";

    sessionStorage.removeItem("Eid");

    $scope.sendData = function (userID, userPassword) {        
        axios.post("http://"+ip+":5000/login/user", {
                id: userID,
                contra: userPassword
              })
              .then((response) => {


                console.log(response.data);
                if (response.data.existe == 1) {
                    sessionStorage.setItem("Eid", response.data.idUsuario);
                    console.log(response.data);
                    if(response.data.estado == true){
                        if (response.data.rol == 2) { //cocinero
                            location.href = "Cocinero.html";
                        } 
                        else if (response.data.rol == 3) { //admin
                            location.href = "Administrador.html";
                        }
                        else if (response.data.rol == 4) { //encargado
                            location.href = "Encargado.html";
                        }                    
                    }                    
                    else if(response.data.estado == false){
                        console.log("Usuario inactivo");
                        sessionStorage.removeItem("Eid");
                    }
                }
                

              }, (error) => {
                console.log(error);
              });                
        
    }

    
});