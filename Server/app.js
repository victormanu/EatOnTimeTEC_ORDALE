"use strict"

var express=require("express")
var bodyParser =require("body-parser")
var mssql=require("mssql")
var http =require("http")
var path =require("path")

var app=express();

// Importar rutas
var index=require ("./routes/index");
var usuarios=require ("./routes/usuarios");
var login=require ("./routes/login");
var registro=require ("./routes/registro");
var amigos=require ("./routes/amigos");
var menuComidaCliente=require ("./routes/menuComidaCliente");
var perfil=require ("./routes/perfil");
var ordenes=require ("./routes/ordenes");
var configuraciones=require ("./routes/configuraciones");
var encargadoMenu=require ("./routes/encargadoMenu");

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());

app.use(function(req,res,next){

    res.setHeader("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin, X-Requested-With,Content-Type,Accept","aplication/json","text/json");
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTIONS");
    next();

});

// Uso de rutas
app.use("/",index);
app.use("/usuarios",usuarios);
app.use("/login",login);
app.use("/registro",registro);
app.use("/amigos",amigos);
app.use("/menuComidaCliente",menuComidaCliente);
app.use("/perfil",perfil);
app.use("/ordenes",ordenes);
app.use("/configuraciones",configuraciones);
app.use("/encargadoMenu",encargadoMenu);


module.exports=app;

