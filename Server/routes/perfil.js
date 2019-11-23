"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();


// Ver perfil usuario Web e identificar cuáles campos se pueden editar
router.post("/user",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC InfoPerfil @identificacion ="+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        request.query("EXEC VerDatosModificables",function(err,result){
            if(err)
                return next(err);
            var mod ={};
            mod= result.recordset;
            res.json({perfil: data, permisos: mod});
        });
    });
});


// Ver perfil cliente
router.post("/cliente",function(req,res,next){
       var request = new mssql.Request();
       request.query("EXEC InfoPerfilPlus @idenficacion ="+req.body.id,function(err,result){
           if(err)
            return next(err);
           var data ={};
           data= result.recordset;
           res.send(data);
        });
});

// Modificar perfil cliente
router.post("/modPerfilCliente",function(req,res,next){
    var request = new mssql.Request();
    console.log(req.body);
    request.query("EXEC ModificarPerfil @id="+req.body.id+",@nombre='"+req.body.nombre+"',@apellidos='"+req.body.apellidos+
    "',@correo='"+req.body.correo+"',@telefono="+req.body.telefono+", @provincia='"+req.body.provincia+"', @preferencias='"+req.body.preferencias+"'",function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Modificado"});
     });
});

// Modificar perfil usuario
router.post("/modPerfilUsuario",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC ModificarPerfilSinPref @id="+req.body.id+",@nombre='"+req.body.nombre+"',@apellidos='"+req.body.apellidos+
    "',@correo='"+req.body.correo+"',@telefono="+req.body.telefono+", @provincia='"+req.body.provincia+"'",function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.send(data);
     });
});

//**************Dar cuenta de baja***************/

// Dar cuenta de baja
router.post("/cuentaBaja",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC DarBajaPersonal @idUser="+req.body.id,function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
     });
     request.query("EXEC DarBajaPersonalMotivo @idUser="+req.body.id,function(err,result){
        if(err)
         return next(err);
        var data ={};
        data= result.recordset;
        res.json({mensaje: "Baja"});
     });
});



module.exports=router;