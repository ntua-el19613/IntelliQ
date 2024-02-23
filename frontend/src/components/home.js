
import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from 'react-router-dom';
import Page from '../app';
import css from '../css/home.css'
//import User from "./user"

export default function Home() {
  const [post, initPost] = useState([])
  const handleClick = async () => {
    await fetch('https://localhost:9103/intelliq_api/newsession',{
    method: 'post',
    headers: { 'Content-Type': 'application/json'} }).then((res) => res.json())
    .then((res)=> {console.log(JSON.stringify(res))}).catch((e) => {console.log("Post error: "+ e.message)})
  }
  return (
  <Page>
     <div className="homeChoices">
     <h1 className="header">IntelliQ</h1>
      <div className="container">
      <Link to="/user">
        <button onClick={handleClick} className="button">User</button>
        </Link>
      <br></br>
      <Link to="/admin">
        <button className="button">Admin</button>
      </Link>
    </div>
    </div> 
  </Page>)
  
  
}



