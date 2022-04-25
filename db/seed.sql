COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/matthewluu/HackReactor/csvData/answers_photos.csv'
DELIMITER ','
CSV HEADER;