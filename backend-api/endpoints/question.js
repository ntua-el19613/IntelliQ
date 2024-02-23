const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');
const { convertArrayToCSV } = require('convert-array-to-csv');

function getquestion(req,res){
    var data=[]

        if (req.params.questionid!='null'){
           
        let myquery="select a_id,a_text,q_id_next,q.questionnaire_id,q.q_id,q_text from questions as q  join answers as a on q.q_id="+"'"+req.params.questionid+"'"+"and q.questionnaire_id="+"'"+req.params.questionnaireid+"'"+" and a.q_id="+"'"+req.params.questionid+"'"+" and a.questionnaire_id="+"'"+req.params.questionnaireid+"'"+" ;";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;

                    var a=[]
            for(let i = 0; i < result.length; i++) {
                a.push({
                "opt_id":result[i].a_id,
                "opt_text":result[i].a_text,
                "nextqid":result[i].q_id_next
        })}
            data.push({
                "questionnaire_id":result[0].questionnaire_id,
                "qid":result[0].q_id,
                "q_text":result[0].q_text,
                "options":a
            })
            if(req.query.format=="csv"){              
                res.send(convertArrayToCSV(result));}
                else{ res.send(data) }
        }) ;

    };
    
}

router.get('/intelliq_api/question/:questionnaireid/:questionid',getquestion)
module.exports=router;