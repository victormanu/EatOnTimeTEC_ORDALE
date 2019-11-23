"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

// Obtener las ordenes de un determinado usuario
router.post("/misOrdenes",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC MisOrdenesUser @idUser="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

// Obtener los platillos de una determinada orden
router.post("/platillosOrdenes",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC PlatosPorOrden @idOrden="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });

});

module.exports=router;