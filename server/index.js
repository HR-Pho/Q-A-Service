require('dotenv').config();
const { pool } = require('../db/db.js');
const express = require('express');
const { getQuestions } = require('../db/queryCity.js');

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:'${process.env.PORT}`)
});

/*---------------------------------------------------------------------------------*/
app.get('/TEST/:varyabowl/POSTMAN', (req, res) => {
  console.log(req.params.varyabowl);
  if (req.query) {
    console.log(`REQUEST QUERY PARAMS: ${req.query.key} <-- SHOULD = VALUE `);
  }
  console.log('Knock knock... who is there?');
  res.send('joe mama')
});

/*---------------------------------------------------------------------------------*/
// LIST OF QUESTIONS:
// REQUEST FORMAT -- GET /qa/questions
app.get('/qa/questions', getQuestions);

/*---------------------------------------------------------------------------------*/
// LIST OF ANSWERS:
// REQUEST FORMAT --  GET /qa/questions/:question_id/answers
//postman test --- localhost:3000/qa/questions/573875/answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const payload = {
    question_id: req.params.question_id,
    results: []
  }
  let count = req.query.count || 5
  const page = req.query.page || 1

  // console.log(`req.query.product_id:: ${req.params.question_id}`)
  // console.log(`req.query.count:: ${req.query.count}`)
  // console.log(`req.query.page:: ${req.query.page}`)

  pool
    .query(`SELECT * FROM answers WHERE question_id = ${req.params.question_id}`)
    .then(result => {
      const answerBlueprint = {};
      if (count > result.rows.length) { count = result.rows.length }
      for (let i = 0; i < count; i++) {
        let row = result.rows[i];
        answerBlueprint.answer_id = row.id;
        answerBlueprint.body = row.body;
        answerBlueprint.date = row.date_written;
        answerBlueprint.answerer_name = row.answerer_name;
        answerBlueprint.helpfulness = row.helpful;
        answerBlueprint.photos = [];
        payload.results.push(answerBlueprint);
      }
      res.status(200).send(payload);
    })
    .catch(err => res.status(500).send(err));
});

/*---------------------------------------------------------------------------------*/
// ADDS A QUESTIONS:
// REQUEST FORMAT --  POST /qa/questions

/*---------------------------------------------------------------------------------*/
// ADDS AN ANSWER:
// REQUEST FORMAT --  POST /qa/questions/:question_id/answers

/*---------------------------------------------------------------------------------*/
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