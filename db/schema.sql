DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;
\c QA;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMM'),
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INT NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMM'),
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INT NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id)
    on delete cascade on update cascade
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(3000) NOT NULL,
  answer_id INT NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers(id)
    on delete cascade on update cascade
);
