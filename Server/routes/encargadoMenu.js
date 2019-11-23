"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();


// Obtener todos los platos
router.get("/obtenerPlatos",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC TodosLosPlatos",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Obtener todos los platos
router.post("/cambioMenu",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC cambiarEstadoPlatos @idPlato = "+req.body.id+",@estado="+req.body.estado,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

module.exports=router;