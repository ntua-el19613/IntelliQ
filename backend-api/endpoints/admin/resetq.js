const express=require('express')
const router=express.Router();
var con = require('../../intelliq.js');

function demolish(req,res){

        let obliterate = "DELETE FROM selected WHERE selected.questionnaire_id = " + req.params.questionnaireID + "";
        con.query(obliterate, function(err, result){
            if(err) {
                res.status(400).send({"status":"failed", "reason":"god hates you"});
            }
            else {
                if (JSON.stringify(result.affectedRows) == 0) {
                    res.status(402).send({"status" : "no data", "reason" : "There was nothing to delete"});
                }
                else{
                    res.send({"status" : "OK"});
                }
            }
        });
    
}

router.post('/admin/resetq/:questionnaireID', demolish)
module.exports=router;