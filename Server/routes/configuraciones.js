"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();


//*****************Modificar**************//

// Establecer la configuración de puntos-platillo
router.post("/puntosPlatillo",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC ModificarPuntosPlato @tipoPlato='"+req.body.tipo+"',@cantidadPuntos="+req.body.puntos,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Modificado"});
    });
});

// Establecer la configuración de puntos-descuento
router.post("/puntosDescuento",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC TasaCambioUp @puntos="+req.body.puntos+", @colones="+req.body.colones,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Modificado"});
    });
});

// Establecer la configuración de modificaciones en el perfil
router.post("/adminModPerfil",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC PermisosDatosModificables @Nombre="+req.body.nombre+",@Apellidos="+req.body.apellidos+
    ",@Correo="+req.body.correo+", @Telefono="+req.body.telefono+",@Provincia="+req.body.provincia+
    ", @Preferencias="+req.body.preferencias,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Establecer la configuración de limite de platos
router.post("/limitePlatos",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC LimitePlatos @limitePlatos="+req.body.limite,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

//*****************Ver**************//

// Ver la configuración de puntos-platillo
router.post("/verPuntosPlatillo",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC VerPuntosPlato @tipoPlato='"+req.body.tipo+"'",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Ver la configuración de puntos-descuento
router.get("/verPuntosDescuento",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC VerTasaCambio",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Ver la configuración de modificaciones en el perfil
router.get("/verAdminModPerfil",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC VerDatosModificables",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});

// Ver la configuración de limite de platos
router.get("/verLimitePlatos",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC VerLimitePlatos",function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
    });
});


//**************Cuentas***************//

// Buscar usuario para darle de baja a la cuenta
router.post("/buscarBaja",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC DarBaja @id="+req.body.id,function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
     });
});

// Dar de baja otras cuentas de usuario
router.post("/cuentaBaja",function(req,res,next){
    var request = new mssql.Request();
     request.query("EXEC DarBajaMotivo @id="+req.body.id+", @motivo='"+req.body.motivo+"'",function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
     });
     request.query("DarBajaUpEstado @id="+req.body.id,function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Baja"});
     });
});

// Reactivar la cuenta de un usuario
router.post("/reactivarCuenta",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC ReactivarCuenta @idUser="+req.body.id,function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Activa"});
     });
});
module.exports=router;