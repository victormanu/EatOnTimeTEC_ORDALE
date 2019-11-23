"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

// Mostrar las órdenes disponibles para todos los cocineros
router.get("/platillosDisponibles",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC OrdenesSinCocinero",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

// Mostrar las órdenes de un cocinero en específico
router.post("/misOrdenesCocinero",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC OrdenesDeCocinero @idCocinero="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

// seleccionar orden
router.post("/selecOrden",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC seleccionarOrdenCocinero @idOrden="+req.body.idOrden+", @idCocinero="+req.body.idCocinero,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Mostrar platillos de una orden
router.post("/mostrarPlatillos",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC PlatosPorOrden @idOrden="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

// Mostrar pasos de un platillo
router.get("/mostrarPasos",function(req,res,next){
    var request = new mssql.Request();
    request.query(""+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Completar pasos de un platillo
router.get("/completarPasos",function(req,res,next){
    var request = new mssql.Request();
    request.query(""+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

module.exports=router;