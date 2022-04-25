require('dotenv').config();
const db = require('./db/db.js');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:'${process.env.PORT}`)
});


/* needed routes:

LIST OF QUESTIONS:
GET /qa/questions

LIST OF ANSWERS:
GET /qa/questions/:question_id/answers

ADDS A QUESTIONS:
POST /qa/questions

ADDS AN ANSWER:
POST /qa/questions/:question_id/answers

MARK QUESTIONS AS HELPFUL:
PUT /qa/questions/:question_id/helpful

MARK ANSWER AS HELPFUL:
PUT /qa/answers/:answer_id/helpful

REPORT QUESTION:
PUT /qa/questions/:question_id/report

REPORT ANSWER:
PUT /qa/answers/:answer_id/report

*/
