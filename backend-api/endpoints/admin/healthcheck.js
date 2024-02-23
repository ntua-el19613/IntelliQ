const express=require('express')
const router=express.Router();
var mysql=require('mysql')
var  con = mysql.createConnection({
    multipleStatements: true,
    host: "127.0.0.1",
    user:"root",
    database: "intelliq"
});

function check(req,res){
    
    con.connect(function(err){
        
    if(err) {
            var message = {"status" : "failed", "dbconnection" : "host: '127.0.0.1', user: 'root', database: 'intelliq'"};
            res.send(message);
        }
    else {
            var message = {"status" : "OK", "dbconnection" : "host: '127.0.0.1', user: 'root', database: 'intelliq'"};
            res.send(message);
        }  
    });
}

router.get('/admin/healthcheck', check)
module.exports=router;