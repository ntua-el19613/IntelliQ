import React from "react";
import {Link} from 'react-router-dom';
import "../css/home.css"

export default function admin() {
  const handleClick = async () => {
    await fetch('https://localhost:9103/admin/resetall',{
    method: 'Post',
    headers: { 'Content-Type': 'application/json'} }).then((res) => res.json).then((res) => {console.log(JSON.stringify(res))}).catch((e) => {console.log(e.message)})
  }
  return (
  <div className="mainContainer">
  <h1 className="mainHeader">Admin options</h1>
   <div className="container">
     <button onClick={handleClick} className="button">Delete everything</button>
   <br></br>
   <Link to='history'><button className="button">History</button></Link>
     <br></br>
     <button className="button" style={{background:"red"}}>sos</button>
     <br></br>
     <button  onClick={() => {window.location.href="https://localhost:9003"}} className='button'>Home</button>
 </div>
 </div>
  ) 

}
