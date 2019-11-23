"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

// Registrar usuarios
router.post("/user",function(req,res,next){
    var request = new mssql.Request();
    console.log("Hola");
    request.query("EXEC LoginReg @identificacion= "+req.body.id,function(err,result){
        if(err)
            return next(err);
        var data ={};
        data= result.recordset;
        console.log(data[0]);
        if (data[0].existe){
            request.query("EXEC Registro @idUsuario="+req.body.id+",@nombre='"+req.body.nombre+
                "',@apellidos='"+req.body.apellidos+"',@correo='"+req.body.correo+"',@telefono="+req.body.telefono+
                ",@provincia='"+req.body.provincia+"', @preferencias='"+req.body.preferencias+"',@estado=1,@rol=1",
                function(err,result){
                    if(err){res.json({mensaje: "Ya existe un usuario asociado a la identificación"});}
                    else{var data ={};
                    data= result.recordset;
                    res.json({mensaje: "Guardo con éxito"});}
                });
        }else{
            res.json({mensaje: "Identificación inválida"});
        }
    });
});

module.exports=router;