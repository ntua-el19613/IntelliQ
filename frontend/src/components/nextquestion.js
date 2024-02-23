import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Page from '../app';
import '../css/home.css'
export default function Nquest() {
  
  const params=useParams();
  const questionnaire=params.questionnaireid; 
  const questid=params.qid;
  const prevqid=params.prevqid;
  const aid=params.aid;
  const sid=params.sid;
  var [question, initQuestion] = useState([])
  var [answers, initAnswers] = useState([])
  useEffect(() => {
      let ignore = false;

      async function startFetching() {
        const json = await fetch('https://localhost:9103/intelliq_api/question/'+questionnaire+'/'+questid).then(response => response.json()).catch((e) => {console.log(e.message)})
        if (!ignore) {
          console.log("1st qid in nque: "+json[0].q_id)
          initQuestion(json);
        }
      }
    
      startFetching();
    
      return () => {
        ignore = true;
      };
  }, []) 
  useEffect(() => {
      let ignore = false;

      async function startFetching() {
        const json = await fetch('https://localhost:9103/intelliq_api/meingetquestionanswers/'+questionnaire+'/'+questid).then(response => response.json()).catch((e) => {console.log(e.message)})
        if (!ignore) {
          console.log("2nd qid in nque: "+json[0].q_id)
          initAnswers(json);
        }
      }
    
      startFetching();
    
      return () => {
        ignore = true;
      };
  }, [])
  const handleClick = async () => {
    await fetch('https://localhost:9103/intelliq_api/doanswer/'+questionnaire+'/'+prevqid+'/'+sid+'/'+aid,{
    method: 'Post',
    headers: { 'Content-Type': 'application/json'} }).then((res) => res.json).then((res) => {console.log(JSON.stringify(res))}).catch((e) => {console.log(e.message)})}
  if(questid=='null') {
      return (
        <Page>
      <div className="mainContainer">
        <h1 className="mainHeader">Thank you bro/sis</h1>
          <Link to={`https://localhost:9003/summary/${questionnaire}/${sid}`}><button onClick={handleClick} className="button">View summary</button></Link>
      </div>
      </Page>
    );
  
  }
  return (
    <Page> 
    {question[0]  && answers  ? (
      <div className="mainContainer">
      <div className="mainHeader">
      <h2 style={{lineHeight: "80px",fontSize: "80px"}}>Select an option</h2>
      <p style={{lineHeight: "70px",fontSize: "70px"}}>{question[0].q_text}</p>
      </div>     
      <ul>
        {answers?.map((answer) => (
            <li key={`answer-${answer.a_id}`}>
              <Link to={`https://localhost:9003/user/question/${answer.questionnaire_id}/${answer.q_id_next}/${answer.q_id}/${answer.a_id}/${sid}`}><button onClick={handleClick} className="button">{answer.a_text}</button></Link>
            </li>
        ))}
        
      </ul>
      </div>
      
    ) : (
      <div className="mainContainer">
      <h1 className="mainHeader">Something went terribly wrong...</h1>
      <li>
            <Link to={'https://localhost:9003'}><button className="button">Home</button></Link>
        </li>
        </div>
    )}
  
  </Page>
  );
}