COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/questions.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE questions_id_seq RESTART WITH 3518964;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/answers.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE answers_id_seq RESTART WITH 6879307;

COPY photos(id, answer_id, url)
FROM '/Users/matthewluu/HackReactor/csvData/answers_photos.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE photos_id_seq RESTART WITH 2063760;
