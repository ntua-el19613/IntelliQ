const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');
const fs=require('fs')
const { convertArrayToCSV } = require('convert-array-to-csv');
 function getsessionanswers(req,res){
    var data=[]
        let myquery="select a.questionnaire_id,q_text,a_text,a.a_id,a.q_id,a.e_id from (((select *from selected where questionnaire_id="+"'"+req.params.questionnaireid+"'"+"and e_id="+"'"+req.params.session+"'"+")as a left join answers on a.a_id=answers.a_id) left join questions on a.q_id=questions.q_id)";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            var a=[]
            for(let i = 0; i < result.length; i++) {
                a.push({
                "q_id":result[i].q_id,
                "ans":result[i].a_id
        })}
        data.push({
            "questionnaireID":result[0].questionnaire_id,
            "session":result[0].e_id,
            "answers":a
        })
        if(req.query.format=="csv"){              
            res.send(convertArrayToCSV(result));}
            else{ res.send(data) }
            //con.end();
        });    
}

router.get('/intelliq_api/getsessionanswers/:questionnaireid/:session',getsessionanswers)
module.exports=router;