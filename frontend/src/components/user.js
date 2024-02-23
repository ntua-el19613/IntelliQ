import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from 'react-router-dom';
import "../css/home.css"

import Page from '../app';

export default function User() {
  
  const [questionnaires, initQuestionnaire] = useState([])
  const [post, initPost] = useState([])
  var [sessionid, initSessionid] = useState([])
  const fetchData = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }
  useEffect(() => {
      let ignore = false;

      async function startFetching() {
        const json = await fetch('https://localhost:9103/intelliq_api/allquestionnaires').then(response => response.json()).catch((e) => {console.log(e.message)})
        if (!ignore) {
          console.log(json[0].questionnairetitle);
          initQuestionnaire(json);
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

        const json = await fetch('https://localhost:9103/intelliq_api/lastsession').then(response => response.json()).catch((e) => {console.log(e.message)})
        if (!ignore) {
          console.log(json[0].e_id)
          initSessionid(json);
        }
      }
    
      startFetching();
    
      return () => {
        ignore = true;
      };
  }, [])
  return (
  <Page>
  {questionnaires.length>0 && sessionid ? (
    <div className="mainContainer">
    <h1 className="mainHeader">What questionnaire would you like to answer ?</h1>
    <ul >
      {sessionid[0] && questionnaires && questionnaires.map((questionnaire) => (
        <li key={`questionnaire-${questionnaire.questionnaire_id}`}>
        <Link to={`question/${questionnaire.questionnaire_id}/${questionnaire.q_fid}/null/null/${sessionid[0].e_id}` }className="button">{questionnaire.questionnairetitle}</Link>
        </li>
      ))}
    </ul>
    </div>
  ) : (
    <div className="mainContainer">
      <h1 className="mainHeader">No questionnaires for now, stay tuned</h1>
            <Link to={'https://localhost:9003'}><button className="button">Home</button></Link>
        </div>
  )}
</Page>
);
  
}

