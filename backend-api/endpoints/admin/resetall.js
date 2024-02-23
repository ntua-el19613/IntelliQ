const express=require('express');
const router=express.Router();
var con = require('../../intelliq.js');


function nuke(req, res){
        let obliterate="DELETE FROM questionnaire; DELETE FROM energy; DELETE FROM questions; DELETE FROM answers; DELETE FROM selected";
        con.query(obliterate, function(err, result){
            if(err) {       
                res.status(500).send({"status":"Internal server error", "reason":"an evil witch cursed you"});
            }
            else {
                var Bool = true
                for (let i=0; i<5; i++){
                    if (result[i].affectedRows !== 0) 
                        Bool = false; //something was deleted
                }
                if (Bool === true){
                    res.status(402).send({"status" : "no data", "reason" : "There was nothing to delete"});
                }
                else {
                    res.send({"status" : "OK"});
                }
            }
        });
}
router.post('/admin/resetall', nuke)
module.exports=router;