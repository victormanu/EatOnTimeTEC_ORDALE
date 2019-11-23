"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

// Crear orden y obtener id
router.post("/generarOrden",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC CrearOrden @idUser="+req.body.id,function(err,result){
        if(err)
            return next(err);
        request.query("EXEC GetOrdenId @idUser="+req.body.id,function(err,result){
            if(err)
                return next(err);
            var data ={};
            data= result.recordset;
            res.send(data);
        });
    });
});

// Obtener platillos del menú del día
router.get("/todosPlatillos",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC TodosLosPlatos",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Obtener platillos recomendados
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

// Seleccionar platillos
router.post("/platilloSelec",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC GetInfoPlatilloSeleccionado @idPlato="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// agregar platillos a la orden
router.post("/agregaPlatillo",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC AgregarPlatoAOrden @idOrden="+req.body.idOrden+", @idPlato="+req.body.idPlatillo,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// eliminar platillos de la orden
router.post("/eliminaPlatillo",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC EliminarPlatilloMismoTipo @idPlatoOrden="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Asociar platillos a amigos
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

module.exports=router;