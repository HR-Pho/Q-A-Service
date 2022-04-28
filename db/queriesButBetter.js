const { pool } = require('./db.js');
module.exports = {
  getQuestions: (req, res) => {
    let { product_id, count = 5, page = 1 } = req.query;
    pool
    .query(`SELECT json_build_object(
      'product_id', ${product_id},
      'results' (json_agg(
        JSON_build_object(
          'question_id', id,
          'question_body', body,
          'question_date', date_written,
          'asker_name', asker_name,
          'question_helpfulness', helpful,
          'reported', reported,
          'answers', {},
        )
      ))
    ) FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${count}`)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
  },


  getAnswers: (req, res) => {
    let { count = 2, page = 1 } = req.query;
    const { question_id } = req.params;
    pool
      .query(`SELECT json_build_object(
        'question_id', ${question_id},
        'results' (json_agg(
          JSON_build_object(
            'answer_id', id,
            'body', body,
            'date', date_written,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (SELECT (
              coalesce(
                json_agg(
                  json_build_object(
                    'id', p.id,
                    'url', p.url
                  )
                ), '[]'
              )
            ) FROM photos p WHERE p.answer_id = a.id
        ))))
      ) FROM questions WHERE question_id = ${question_id} AND reported = false LIMIT ${count}`)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
  }
}







