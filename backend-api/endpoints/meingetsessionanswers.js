const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');
    function meingetsessionanswers(req,res){
        let myquery="select a.questionnaire_id,q_text,a_text,a.a_id,a.q_id,a.e_id from (((select *from selected where questionnaire_id="+"'"+req.params.questionnaireid+"'"+"and e_id="+"'"+req.params.session+"'"+")as a left join answers on a.a_id=answers.a_id) left join questions on a.q_id=questions.q_id)";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result)
            //con.end();
        });    
}

router.get('/intelliq_api/meingetsessionanswers/:questionnaireid/:session',meingetsessionanswers)
module.exports=router;