"use strict"
var mssql=require("mssql")
var http =require("http")
var path =require("path")
var express=require("express")
var router=express.Router();

router.get("/",function(req,res,next){
    var request = new mssql.Request();
    request.query("SELECT * FROM Cliente",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

router.post("/",function(req,res,next){
    var request = new mssql.Request();
    console.log(req.body)
    request.query("INSERT INTO Usuario (idUsuario, nombre, apellidos, correo, telefono, provincia, preferencias, estado, rol) VALUES ("+req.body.id+",'"+req.body.nombre+"','"+req.body.apellidos+"','"+req.body.correo+"','"+req.body.telefono+"','"+req.body.provincia+"','"+req.body.preferencias+"',1,1)",
    function(err,result){
        if(err)
            return next(err);    
        res.send(result.rowsAffected);
    });
});

module.exports=router;


