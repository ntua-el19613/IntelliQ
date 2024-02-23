const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');

function newsession(req,res){
        let myquery="insert into energy(e_id,date_happend,time_happend,success) select max(e_id)+1,current_date(),current_time(),true from energy";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result);
        });
        //con.end();
}


router.post('/intelliq_api/newsession',newsession)
module.exports=router;