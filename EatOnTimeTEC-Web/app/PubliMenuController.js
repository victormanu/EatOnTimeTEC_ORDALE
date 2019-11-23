var app = angular.module('app');

app.controller("PubliMenuCtrl", function ($scope, $http) {        

    var ip = "172.18.73.24";
    
    $scope.getNavbarValues = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
        
        //////////////////////////////
        var xmlhttp = new XMLHttpRequest();
        var tableData1 = [];
          
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                tableData1 = JSON.parse(this.responseText);
                jQuery.each(tableData1, function (j, row) {
                  if(row.estado == true){
                    nombre = '<button type=button class=btn btn-primary id="'+row.idPlato+'"  onclick=quitar(id)>'+row.NombrePlato+'</button><br><br>';
                    $("#menu").append(nombre);
                  }
                  else if(row.estado == false){
                    nombre = '<button type=button class=btn btn-success id="'+row.idPlato+'"  onclick=agregar(id)>'+row.NombrePlato+'</button><br><br>';
                    $("#todos").append(nombre);
                  }
                  //console.log(row.estado);                  
                });
                //$("#puntos").val(tableData1.data[0].puntos);
            }
        };
        xmlhttp.open("GET", "http://"+ip+":5000/encargadoMenu/obtenerPlatos", true);

        xmlhttp.send();
                
    }

    $scope.getNavbarValues2 = function () { //Sets the navbar values.

      document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");

  }

    agregar = function (valor) { //Sets the navbar values.

      console.log(valor);
      axios.post("http://"+ip+":5000/encargadoMenu/cambioMenu", {
                id: valor,
                estado: 1
              })
              .then((response) => {
                console.log(response.data); 
                location.href = "PubliMenu.html";
              }, (error) => {
                console.log(error);
              });

    }

    quitar = function (valor) { //Sets the navbar values.

      console.log(valor);
      axios.post("http://"+ip+":5000/encargadoMenu/cambioMenu", {
                id: valor,
                estado: 0
              })
              .then((response) => {
                console.log(response.data); 
                location.href = "PubliMenu.html";
              }, (error) => {
                console.log(error);
              });

    }

});