# IntelliQ 

Software Engineering Project 2022-2023 @ NTUA, 7th Semester 2022-2023

This project was conducted for the course of Software Engineering at the 2022-2023 Winter semester of the Electrical and Computer Engineering School at the National Technical University of Athens.

This project was a collaborate effort of a team of 6 members. 

## Group: softeng2022-42

Christos Exarchos (el19039)

Giannouchou Olga (el19613)

Michael-Aggelos Eleftheriadis (el19913)

Aikaterini Stavrou (el19932)

Aristomenis Koubanakis (el19089)

Sevastianos Ioannidis (el19859)

## Description 

The goal of this project is to develop a software tool which can create intelligent questionnaires. The term "intelligent questionnaire" is used to describe questionnaires where the answer to a question defines the content of the following question. The stakeholders such as the companies who conduct statistical research will be able to use our software and collect the answers from all the questionnaires they create. Other stakeholders such as the participants of a research will be able to answer the questionnaires through a user-friendly UI or a CLI.

## Users

Admin: can create questionnaires and view results  
User: can answer questionnaires 

## Technical Details

**Assets**/**Technologies Used**        

backend --> NodeJS

frontend --> Javascript, ReactJS, CSS

database --> MySQL

CLI --> NodeJS

## Backend 

To start the backend:

First you need to write npm install in the backend-api directory. To start use the command node server.js. 

Install mySQL(MariaDB) and create a database with the following requirements: 

        host: "127.0.0.1",    user:"root",     database name: "intelliq"

## Frontend 

To run the front-end:

First you need to write npm install in the frontend directory. To start the front-end use npm start. 
## CLI Commands

 - node se2242.js healthckeck
 - node se2242.js resetall
 - node se2242.js questionnaire_upd --source
 - node se2242.js resetq --questionnaire_id
 - node se2242.js questionnaire --questionnaire_id --format fff
 - node se2242.js question --questionnaire_id --question_id --format fff
 - node se2242.js doanswer --questionnaire_id --question_id --session_id --option_id
 - node se2242.js getsessionanswers --questionnaire_id --session_id --format fff
 - node se2242.js getquestionanswers --questionnaire_id --question_id --format fff

 *fff: json or csv format

To run any commands in the cli-client:

First you need to write npm install in the cli directory. Then you can use the commands above.


## Packages Needed

To run this app install these packages:

npm i:

 - body-parser 
 - convert-array-to-csv 
 - cors 
 - dotenv 
 - ejs 
 - express 
 - fs 
 - morgan 
 - mysql 
 - nodemon 
 - package path jest-environment-jsdom 
 - react-scripts
 