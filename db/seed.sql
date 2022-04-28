COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/questions.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE questions_id_seq RESTART WITH 3518964;
UPDATE questions SET date_written=date_written/1000;
ALTER TABLE questions ALTER COLUMN date_written TYPE timestamp without time zone using to_timestamp(date_written) AT TIME ZONE 'UTC';
ALTER TABLE questions ALTER COLUMN date_written SET DEFAULT NOW();
CREATE INDEX questionProductIndex ON questions (product_id);
CREATE INDEX questionIndex ON questions (id);


COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/matthewluu/HackReactor/csvData/answers.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE answers_id_seq RESTART WITH 6879307;
UPDATE answers SET date_written=date_written/1000;
ALTER TABLE answers ALTER COLUMN date_written TYPE timestamp without time zone using to_timestamp(date_written) AT TIME ZONE 'UTC';
ALTER TABLE answers ALTER COLUMN date_written SET DEFAULT NOW();
CREATE INDEX answerQuestionIndex ON answers (question_id);
CREATE INDEX answerIndex ON answers (id);

COPY photos(id, answer_id, url)
FROM '/Users/matthewluu/HackReactor/csvData/answers_photos.csv'
DELIMITER ','
CSV HEADER;
ALTER SEQUENCE photos_id_seq RESTART WITH 2063760;
CREATE INDEX photoAnswerIndex ON photos (answer_id);
CREATE INDEX photoIndex ON photos (id);
