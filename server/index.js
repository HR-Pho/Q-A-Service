require('dotenv').config();
const { pool } = require('../db/db.js');
const express = require('express');
const { getQuestions, getAnswers, postQuestion, postAnswer } = require('../db/queryCity.js');

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:'${process.env.PORT}`)
});


app.get('/TEST/:varyabowl/POSTMAN', (req, res) => {
  console.log(req.params.varyabowl);
  if (req.query) {
    console.log(`REQUEST QUERY PARAMS: ${req.query.key} <-- SHOULD = VALUE `);
  }
  console.log('Knock knock... who is there?');
  res.send('joe mama')
});

app.get('/qa/questions', getQuestions);
app.get('/qa/questions/:question_id/answers', getAnswers);

app.post('/qa/questions', postQuestion);
app.post('/qa/questions/:question_id/answers', postAnswer);

// MARK QUESTIONS AS HELPFUL:
// REQUEST FORMAT --  PUT /qa/questions/:question_id/helpful

/*---------------------------------------------------------------------------------*/
// MARK ANSWER AS HELPFUL:
// REQUEST FORMAT --  PUT /qa/answers/:answer_id/helpful

/*---------------------------------------------------------------------------------*/
// REPORT QUESTION:
// REQUEST FORMAT --  PUT /qa/questions/:question_id/report

/*---------------------------------------------------------------------------------*/
// REPORT ANSWER:
// REQUEST FORMAT --  PUT /qa/answers/:answer_id/report