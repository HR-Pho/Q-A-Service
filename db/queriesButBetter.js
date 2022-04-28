const { pool } = require('./db.js');

module.exports = {
  getQuestions2: (req, res) => {
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


  getAnswers2: (req, res) => {
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
  }
}






/*-------------TESTS FOR TERMINAL----------------

SELECT json_build_object(
  'product_id', 200,
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
) FROM questions WHERE product_id = 200 AND reported = false LIMIT 10

-------------------------------------------------

SELECT json_build_object(
  'question_id', 3518965,
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
          ) FROM photos WHERE answer_id = 6879308
        )
      )
    )
  )
) FROM answers WHERE question_id = 3518965 AND reported = false LIMIT 10


*/