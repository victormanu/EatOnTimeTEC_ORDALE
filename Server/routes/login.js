"use strict"
var mssql=require("mssql")
var express=require("express")
var router=express.Router();

// Realizar login de los usuarios
router.post("/user",function(req,res,next){
    var request = new mssql.Request();
    request.query("EXEC LoginDB @identificacion= "+req.body.id+", @pass='"+req.body.contra+"'",function(err,result){
        if(err)
            return next(err);
            try{
                var data ={};
                data= result.recordset;
                const val = data[0].existe;
                res.send(data[0]);
            }catch(err){
                res.json({mensaje:"Usuario inválido"});
            }
    });
});

module.exports=router;