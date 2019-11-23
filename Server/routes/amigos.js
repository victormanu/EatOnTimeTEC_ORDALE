"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

//Ver lista de amigos
router.post("/listaAmigos",function(req,res,next){
    var request = new mssql.Request();
    console.log(req.body)
    request.query("EXEC MisAmigos @id="+req.body.id,
    function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});


//************************************Solicitudes de amistad**********************/

// Ver solicitudes de amistad
router.post("/solicitudes",function(req,res,next){
    var request = new mssql.Request();
    console.log(req.body)
    request.query("EXEC MisSolicitudesAmistad @id ="+req.body.id,
    function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Ver aceptar solicitudes de amistad
router.post("/aceptar",function(req,res,next){
    var request = new mssql.Request();
    console.log(req.body)
    try{
    request.query("EXEC aceptarAmigo @id ="+req.body.id+", @idAmigo ="+req.body.usuario,
    function(err,result){
        if(err)
            return next(err);    
    });
    request.query("EXEC aceptarAmigoInsert @id ="+req.body.id+", @idAmigo ="+req.body.usuario,
    function(err,result){
        if(err)
            return next(err);    
        res.send(result.rowsAffected);
    });
    }catch(err){
        res.send(result.rowsAffected);
    }
});

module.exports=router;