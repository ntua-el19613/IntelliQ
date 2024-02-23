const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');
const { convertArrayToCSV } = require('convert-array-to-csv');

function getquestionanswers(req,res){
    var data=[]
        if (req.params.questionID!='null'){
        let myquery="select * from selected where questionnaire_id="+" "+req.params.questionnaireID+" "+ "and q_id="+" "+req.params.questionID+" "   
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            var a=[]
            for(let i = 0; i < result.length; i++) {
                a.push({
                "ans":result[i].a_id,
                "session":result[i].e_id,
        })}
        data.push({
            "questionnaire_id":result[0].questionnaire_id,
            "qid":result[0].q_id,
            "answers":a
        }) 
            if(req.query.format=="csv"){              
            res.send(convertArrayToCSV(result));}
            else{ res.send(data) }
            //con.end();
        });
    };
}

router.get('/intelliq_api/getquestionanswers/:questionnaireID/:questionID',getquestionanswers)
module.exports=router;