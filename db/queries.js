const { pool } = require('./db.js');
module.exports = {
  getQuestions: (req, res) => {
    let { product_id, count = 5, page = 1 } = req.query;
    pool
      .query(`
        SELECT json_build_object(
          'product_id', ${product_id},
          'results', (
            json_agg(
              JSON_build_object(
                'question_id', id,
                'question_body', body,
                'question_date', date_written,
                'asker_name', asker_name,
                'question_helpfulness', helpful,
                'reported', reported
              )
            )
          )
        ) FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${count}
      `)
      .then(result => {
        console.log(result.rows[0].json_build_object)
        res.status(200).send(result.rows[0].json_build_object)
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
    pool
      .query(`
        SELECT json_build_object(
          'question_id', ${question_id},
          'results', (
            json_agg(
              JSON_build_object(
                'answer_id', id,
                'body', body,
                'date', date_written,
                'answerer_name', answerer_name,
                'helpfulness', helpful,
                'photos', (
                  SELECT (
                    coalesce(
                      json_agg(
                        json_build_object(
                          'id', id,
                          'url', url
                        )
                      ), '[]'
                    )
                  ) FROM photos WHERE answer_id = id
                )
              )
            )
          )
        ) FROM answers WHERE question_id = ${question_id} AND reported = false LIMIT ${count}
      `)
      .then(result => {
        console.log(result.rows[0].json_build_object)
        res.status(200).send(result.rows[0].json_build_object)
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

