const { pool } = require('./db.js');

module.exports = {
  getQuestions: (req, res) => {
    let { product_id, count = 5, page = 1 } = req.query;
    const payload = {
      product_id: product_id,
      results: []
    };

    pool
      .query(`SELECT * FROM questions WHERE product_id = ${product_id}`)
      .then(result => {
        if (count > result.rows.length) { count = result.rows.length }
        for (let i = 0; i < count; i++) {
          let { id, body, date_written, asker_name, helpful, reported } = result.rows[i];
          payload.results.push({
              question_id: id,
              question_body: body,
              question_date: date_written,
              asker_name: asker_name,
              question_helpfulness: helpful,
              reported: reported,
              answers: {},
          })
        }
        res.status(200).send(payload);
      })
      .catch(err => res.status(500).send(err));
  },
  postQuestion: '',
  markQuestionHelpful: '',
  reportQuestion: '',
  getAnswers: '',
  postAnswer: '',
  markAnswerHelpful: '',
  reportAnswer: ''
}

