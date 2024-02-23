import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from 'react-router-dom';
import "../css/home.css"

import Page from '../app';

export default function History() {
  
  const [questionnaires, initQuestionnaire] = useState([])
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
  return (
  <Page>
  {questionnaires.length>0 ? (
    <div className="mainContainer">
    <h1 className="mainHeader">Select a questionnaire to view answer history</h1>
    <ul >
      {questionnaires && questionnaires.map((questionnaire) => (
        <li key={`questionnaire-${questionnaire.questionnaire_id}`}>
        <Link to={`${questionnaire.questionnaire_id}` }className="button">{questionnaire.questionnairetitle}</Link>
        </li>
      ))}
    </ul>
    </div>
  ) : (
    <div className="mainContainer">
      <h1 className="mainHeader">No questionnaires in the database</h1>
            <Link to={'https://localhost:9003'}><button className="button">Home</button></Link>
        </div>
  )}
</Page>
);
  
}