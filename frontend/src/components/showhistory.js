import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Page from '../app';
import '../css/home.css'
export default function Showhistory() {
    const params=useParams();
  const questionnaire=params.questionnaireid;
  var [history, initHistory] = useState([])
  useEffect(() => {    
      let ignore = false;

      async function startFetching() {
        const json = await fetch('https://localhost:9103/intelliq_api/getquestionnaireanswers/'+questionnaire).then(response => response.json()).catch((e) => {console.log(e.message)})
        if (!ignore) {
          console.log("a_id in sum: "+json[0].a_id);
          initHistory(json);
        }
      }
    
      startFetching();
    
      return () => {
        ignore = true;
      };
  }, [])
  return (
    <Page>
      <div className="mainContainer">
      <div className="mainHeader">
          <p style={{lineHeight: "70px",fontSize: "70px"}}>People answered these  : </p>
          </div>
        <ul className="mainContainer">
        {history?.map((history) => (
            <li className="mainHeader" style={{flexDirection:"row",backgroundColor:"purple",paddingLeft:"10px",paddingRight:"10px",borderTopRightRadius:"25%",borderBottomRightRadius:"25%",borderBottomLeftRadius:"25%",color:"white"}}>       
            <p style={{lineHeight: "25px",fontSize: "25px"}}>Session ID :  {history.e_id}</p> 
            <p style={{lineHeight: "25px",fontSize: "25px"}}>{history.q_text} : </p> 
            <p style={{lineHeight: "25px",fontSize: "25px"}}>{history.a_text}</p>
            </li> 
        ))}
        </ul>
          <button  onClick={() => {window.location.href="https://localhost:9003"}} className='button'>Home</button>
        
        </div>
    </Page>
  )

}