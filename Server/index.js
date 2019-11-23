"use strict"

var mssql =require("mssql");

var app=require("./app")

app.set("view engine","ejs");

var port = process.env.PORT || 5000;

var config ={
    user:"LoginSanJose",
    password:"123",
    server:"172.18.71.167",
    port:1433,
    database:"EatOnTimeTEC_DB"
};

var connection = mssql.connect(config,function(err,res){
    if (err){
        throw err;
    } else{
        console.log("CONECTADO CORRECTAMENTE");
        app.listen(port,"0.0.0.0",function(){
            console.log("api rest runinng");
        });
    }
});

module.exports =app;
