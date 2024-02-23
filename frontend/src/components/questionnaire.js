import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Page from '../app';
export default function Questionnaire() {
  
    const [questionnaire, initQuestionnaire] = useState([])
    const params=useParams();
    const questionnaireid=params.questionnaireid; 
    const sid=params.sid;
    const fetchData = async (url) => {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Data coud not be fetched!')
        } else {
          return response.json()
        }
      }
      useEffect(() => {
        fetchData(`https://localhost:9103/intelliq_api/questionnaire/${questionnaireid}`)
          .then((res) => {
            initQuestionnaire(res)
          })
          .catch((e) => {
            console.log(e.message)
          })
      }, [])
      return (
          <ul>
            {questionnaire?.map((questionnaire) => (
              <li key={`questionnaire-${questionnaire.questionnaire_id}`}>
              <Link to={`https://localhost:9003/user/question/${questionnaire.questionnaire_id}/${questionnaire.questions[0].qid}/null/null/${sid}`}>start: {questionnaire.questionnairetitle}</Link>
              </li>
            ))}
          </ul>
        )
    };  
