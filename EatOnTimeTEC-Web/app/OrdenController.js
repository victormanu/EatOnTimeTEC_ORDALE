var app = angular.module('app');

app.controller("OrdenCtrl", function ($scope, $http) {        

    var ip = "172.18.73.24";
    
    $scope.getNavbarValues = function () { //Sets the navbar values.

        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
  
    }
    
    $scope.getNavbarValues2 = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
        
        /*nombre = '<div class="row"><div class="col-lg-4"><label for="nor">Número de Orden: ' +
                              'row.idOrden' + '</label></div><div class="col-lg-5"><button type="button" onclick=agregar(id) ' +
                              'class="btn btn-success" id="'+'row.idOrden'+'">Seleccionar</button></div></div>' +
                              '<div class="row" style="padding-left: 30px;"><div class="col-lg-4">'+
                              '<label for="nor">Lista de platillos</label></div></div>';
        $("#ordenes").append(nombre);
        $("#ordenes").append(nombre);
        $("#ordenes").append(nombre);
        $("#ordenes").append(nombre);*/

        
        //////////////////////////////
        var xmlhttp = new XMLHttpRequest();
        var tableData1 = [];
          
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                tableData1 = JSON.parse(this.responseText);
                jQuery.each(tableData1, function (j, row) {
                    nombre = '<div class="row"><div class="col-lg-4"><label for="nor">Número de Orden: ' +
                              row.idOrden + '</label></div><div class="col-lg-5"><button type="button" class="btn btn-success" onclick=agregar(id)' +
                              ' id="'+row.idOrden+'">Seleccionar</button></div></div>' +
                              '<div class="row" style="padding-left: 30px;"><div class="col-lg-4">'+
                              '<label for="nor">Lista de platillos</label></div></div>';
                    $("#ordenes").append(nombre);
                    //console.log(row.estado);                  
                });
                //$("#puntos").val(tableData1.data[0].puntos);
            }
        };
        xmlhttp.open("GET", "http://"+ip+":5000/cocineros/platillosDisponibles", true);

        xmlhttp.send();
                
    }

    $scope.getNavbarValues3 = function () {      
        document.getElementById("userID").innerHTML = sessionStorage.getItem("Eid");
        
        

        axios.post("http://"+ip+":5000/cocineros/misOrdenesCocinero", {                
                id: 2
              })
              .then((response) => {
                nombre = '<div class="row"><div class="col-lg-4"><label for="nor">Número de Orden: ' +
                response.data[0].idOrden + '</label></div><div class="col-lg-5"><button type="button" class="btn btn-success" onclick=agregar(id)' +
                ' id="'+response.data[0].idOrden+'">Seleccionar</button></div></div>' +
                '<div class="row" style="padding-left: 30px;"><div class="col-lg-4">'+
                '<label for="nor">Lista de platillos</label></div></div>';
                $("#ordenes").append(nombre);
                console.log(response.data); 
              }, (error) => {
                console.log(error);
        });
        //////////////////////////////
        
               
    }

    

    agregar = function (valor) { //Sets the navbar values.

      console.log(valor);
      axios.post("http://"+ip+":5000/cocineros/selecOrden", {
                idOrden: valor,
                idCocinero: 2
              })
              .then((response) => {
                console.log(response.data); 
                location.href = "VerOrden.html";
              }, (error) => {
                console.log(error);
              });

    } 
    
    $scope.selecOrden = function (valor) { //Sets the navbar values.

        console.log(valor);
        location.href = "PrepOrden.html";
        /*axios.post("http://"+ip+":5000/encargadoMenu/cambioMenu", {
                  idOrden: valor
                })
                .then((response) => {
                  console.log(response.data); 
                  location.href = "PrepOrden.html";
                }, (error) => {
                  console.log(error);
                });
  */
      }
    
    

});