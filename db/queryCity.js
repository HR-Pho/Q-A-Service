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
              reported: reported
          })
        }
        res.status(200).send(payload);
      })
      .catch(err => res.status(500).send(err));
  },


  postQuestion: (req, res) => {
    const { email, body, name, product_id } = req.query;
    pool
      .query(`INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful) VALUES ('${product_id}', '${body}', '${name}', '${email}', false, 0)`)
      .then(result => res.status(201).send(result))
      .catch(err => res.status(500).send(err));
  },


  markQuestionHelpful: (req, res) => {
    const { question_id } = req.params;
    pool
      .query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${question_id}`)
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err));
  },


  reportQuestion: (req, res) => {
    const { question_id } = req.params;
    pool
      .query(`UPDATE questions SET reported = true WHERE id = ${question_id}`)
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err));
  },


  getAnswers: (req, res) => {
    let { count = 2, page = 1 } = req.query;
    const { question_id } = req.params;
    const payload = {
      question_id: req.params.question_id,
      results: []
    };
    pool
      .query(`SELECT * FROM answers WHERE question_id = ${question_id}`)
      .then(result => {
        if (count > result.rows.length) { count = result.rows.length }
        for (let i = 0; i < count; i++) {
          let { id, body, date_written, answerer_name, helpful } = result.rows[i];
          payload.results.push({
            answer_id: id,
            body: body,
            date: date_written,
            answerer_name: answerer_name,
            helpfulness: helpful,
            photos: []
          });
          //gotta snag them photos for each answer too
          pool
            .query(`SELECT * FROM photos WHERE answer_id = ${id}`)
            .then(resultPartTwo => {
              for (let j = 0; j < resultPartTwo.rows.length; j++) {
                payload.results.photos.push(resultPartTwo.rows[j].url);
              }
            })
            .catch(err => res.status(500).send(err));
        }
        res.status(200).send(payload);
      })
      .catch(err => res.status(500).send(err));
  },


  postAnswer: (req, res) => {
    const { email, body, name } = req.query;
    const { question_id } = req.params
    pool
      .query(`INSERT INTO answers (question_id, body, answerer_name, answerer_email, reported, helpful) VALUES ('${question_id}', '${body}', '${name}', '${email}', false, 0)`)
      .then(result => res.status(201).send(result))
      .catch(err => res.status(500).send(err));
  },


  markAnswerHelpful: (req, res) => {
    const { answer_id } = req.params;
    pool
      .query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${answer_id}`)
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err));
  },


  reportAnswer: (req, res) => {
    const { answer_id } = req.params;
    pool
      .query(`UPDATE answers SET reported = true WHERE id = ${answer_id}`)
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err));
  }
}

