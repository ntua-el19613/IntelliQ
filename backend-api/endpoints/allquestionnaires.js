const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');

function allquestionnaires(req,res){
        //console.log("connected");
        let myquery="select min(q_id) as q_fid,questionnaire.questionnaire_id,questionnaire.questionnairetitle from (questionnaire right join questions on questionnaire.questionnaire_id=questions.questionnaire_id) group by questionnaire.questionnaire_id";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result);
        });
}

router.get('/intelliq_api/allquestionnaires',allquestionnaires)
module.exports=router;