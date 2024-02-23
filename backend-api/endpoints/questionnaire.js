const express=require('express')
const router=express.Router();
var con = require('../intelliq.js');
const { convertArrayToCSV } = require('convert-array-to-csv');

async function getquestionnaireid(req,res){
        var data=[]
        let myquery="select * from questionnaire as a join questions as s on a.questionnaire_id="+" "+req.params.questionnaireid+" "+" and s.questionnaire_id="+" "+req.params.questionnaireid+" ";
         con.query(myquery, function(err,result,fields){
            if(err) throw err;
            var q=[]
            for(let i = 0; i < result[0].n_quests; i++) {
                q.push({

                "qid":result[i].q_id,
                "q_text":result[i].q_text
                
        })
        }
            data.push({"questionnaire_id":result[0].questionnaire_id,
            "questionnairetitle":result[0].questionnairetitle,
            "keywords":result[0].keywords,
            "questions":q

        })  
            if(req.query.format=='csv'){
                res.send(convertArrayToCSV(result));
            }
            else{      
            res.send(data)}     
            //con.end();
        });
}

router.get('/intelliq_api/questionnaire/:questionnaireid',getquestionnaireid)
module.exports=router;