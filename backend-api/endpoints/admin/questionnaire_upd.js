const express=require('express')
const fs = require('fs')
const router=express.Router();
var con = require('../../intelliq.js');
'use strict';

function get_id(req, res){
    let rawdata = fs.readFileSync(req.params.filepath.replaceAll('-_-','/'));
    let vesk = JSON.parse(rawdata);
        let query1="INSERT INTO questionnaire (questionnairetitle, n_quests, questionnaire_id) VALUES (" + "'" +vesk.questionnaireTitle+ "'" + "," +vesk.questionNum+ "," + vesk.questionnaireID + ")"
        con.query(query1, function(err,result){
            if(err) {
                throw err;
            } else {
                            question_values = [];
                            let query2 = "INSERT INTO questions (q_id, q_text, isprofile, questionnaire_id) VALUES ?";
                            for (let i=0; i < vesk.questionNum; i++){
                                question_values.push(new Array(vesk.questions[i].qID, vesk.questions[i].qtext, vesk.questions[i].isprofile, vesk.questionnaireID));
                            }
                            con.query(query2, [question_values], function(err) {
                                if (err) {
                                    res.status(400).send("Most likely problem in json file");
                                }
                                else{
                                    let query3 = "INSERT INTO answers (a_id, a_text, q_id, q_id_next, questionnaire_id) VALUES ?";
                                    for (let i=0; i < vesk.questionNum; i++){
                                            answer_values = [];
                                            for (let j=0; typeof vesk.questions[i].options[j] !== 'undefined'; j++){  //no option_number for question, so condition is "as long as options exist"
                                                answer_values.push(new Array(vesk.questions[i].options[j].optID, vesk.questions[i].options[j].opttxt, vesk.questions[i].qID, vesk.questions[i].options[j].nextqID, vesk.questionnaireID));
                                            }
                                            con.query(query3, [answer_values], function(err) {
                                                if (err) res.status(400).send("Most likely problem in json file");
                                            });
                                        } 

                                }
                            });  
                            
            
                }
            });
        res.send();

}

router.post('/admin/questionnaire_upd/:filepath', get_id)
module.exports=router;