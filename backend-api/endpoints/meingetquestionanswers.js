const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');

function meingetquestionanswers(req,res){

        if (req.params.questionID!='null'){
        let myquery="select * from answers where (answers.questionnaire_id="+"'"+req.params.questionnaireID+"'"+"and q_id="+"'"+req.params.questionID+"'"+");"    //"+(SELECT min(q_id) as min_qid FROM questions where questionnaire_id="+"'"+req.params.questionnaireID+"'"+"))";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result);
            //con.end();
        });
    };
}

router.get('/intelliq_api/meingetquestionanswers/:questionnaireID/:questionID',meingetquestionanswers)
module.exports=router;