const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');

function lastsession(req,res){
        //console.log("connected");
        let myquery="select max(e_id) as e_id from energy";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result);
        });
        //con.end();
}
router.get('/intelliq_api/lastsession',lastsession)
module.exports=router;