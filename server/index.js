require('dotenv').config();
const express = require('express');
const { getQuestions, getAnswers, postQuestion, postAnswer, markQuestionHelpful, markAnswerHelpful, reportQuestion, reportAnswer } = require('../db/queryCity.js');
const { getQuestions2, getAnswers2 } = require('../db/queriesButBetter.js');

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:'${process.env.PORT}`)
});

app.get('/qa/questions', getQuestions2);
app.get('/qa/questions/:question_id/answers', getAnswers2);

app.post('/qa/questions', postQuestion);
app.post('/qa/questions/:question_id/answers', postAnswer);

app.put('/qa/questions/:question_id/helpful', markQuestionHelpful);
app.put('/qa/answers/:answer_id/helpful', markAnswerHelpful);

app.put('/qa/questions/:question_id/report', reportQuestion);
app.put('/qa/answers/:answer_id/report', reportAnswer);