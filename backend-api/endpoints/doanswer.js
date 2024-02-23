const express=require('express')
//const app=express()
const router=express.Router();
var con = require('../intelliq.js');

//app.use(express.static('./public'))

function doanswer(req,res){
        //console.log("connected");
        let myquery="insert into selected(e_id,a_id,questionnaire_id,q_id) values("+"'"+req.params.session+"'"+","+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.questionID+"'"+")";
        con.query(myquery, function(err,result,fields){
            if(err) throw err;
            res.send(result);
            //con.end();
        });
}

router.post('/intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID',doanswer)
module.exports=router;