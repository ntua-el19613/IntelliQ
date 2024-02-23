const https=require('https')
const express=require('express')
const fs=require('fs')
const path=require('path')
const url=require('url')
const app=express()
const cors=require('cors')
const port=9103;
/*const agent = new https.Agent({
    rejectUnauthorized: false
  })*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//app.use(express.static('./public'))
//const myurl = new URL('https://localhost:9103/intelliq_api')
const sslserver = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
)

sslserver.listen(port, ()=> (
    console.log(`server is running on ${port}.`)
));

app.use(cors());

const questionnaireid=require("./endpoints/questionnaire.js")
app.use('/',questionnaireid)

const allquestionnaires=require("./endpoints/allquestionnaires.js")
app.use('/',allquestionnaires)

const question=require("./endpoints/question.js")
app.use('/',question)

const doanswer=require("./endpoints/doanswer.js")
app.use('/',doanswer)

const getsessionanswers=require("./endpoints/getsessionanswers.js")
app.use('/',getsessionanswers)

const meingetsessionanswers=require("./endpoints/meingetsessionanswers.js")
app.use('/',meingetsessionanswers)

const getquestionanswers=require("./endpoints/getquestionanswers.js")
app.use('/',getquestionanswers)

const meingetquestionanswers=require("./endpoints/meingetquestionanswers.js")
app.use('/',meingetquestionanswers)

const newsession=require("./endpoints/newsession.js")
app.use('/',newsession)

const lastsession=require("./endpoints/lastsession.js")
app.use('/',lastsession)

const questionnaire_upd=require("./endpoints/admin/questionnaire_upd.js")
app.use('/',questionnaire_upd)

const resetall=require("./endpoints/admin/resetall.js")
app.use('/',resetall)

const resetq=require("./endpoints/admin/resetq.js")
app.use('/',resetq)

const healthcheck=require("./endpoints/admin/healthcheck.js")
app.use('/',healthcheck)

const getquestionnaireanswers=require("./endpoints/getquestionnaireanswers.js")
app.use('/',getquestionnaireanswers)


