const fs = require("fs");
const fastcsv = require("fast-csv");
const { Client } = require("pg");
const assert = require('assert');
const { generate } = require('csv-generate');
const { parse } = require('csv-parse');
const path = require('path')
const db = require('./indexdb.js')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function populateTableAnswers() {

  const client = new Client({
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
  });
  await client.connect();
  await (async () => {
    const parser = fs.createReadStream("./answers.csv").pipe(parse({
      skip_records_with_error: true,
      columns: true,
      // to_line: 5
    }));


    const text =
      "INSERT INTO answers (answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

    process.stdout.write('...starting answers')
    for await (const record of parser) {
      var date = new Date(parseInt(record.date_written))
      var report;
      record.reported === '0' ? report = "false" : report = "true"
      var values = [
        parseInt(record.id),
        parseInt(record.question_id),
        record.body,
        date,
        record.answerer_name,
        record.answerer_email,
        report,
        parseInt(record.helpful),
      ]

      await client.query(text, values)
    };

    process.stdout.write('...done answers')

  })()

}

(async function () {
  const client = await db.connect()

  await client.query('DROP TABLE  IF EXISTS questions, answers, photos')

  await client.query('CREATE TABLE IF NOT EXISTS questions (product_id BIGINT, question_id serial PRIMARY KEY NOT NULL, question_body VARCHAR, question_date VARCHAR, asker_name VARCHAR, asker_email VARCHAR, reported VARCHAR, question_helpfulness INT)')

  await client.query('CREATE TABLE IF NOT EXISTS answers (answer_id serial PRIMARY KEY NOT NULL, question_id BIGINT, body VARCHAR, date VARCHAR, answerer_name VARCHAR, answerer_email VARCHAR, reported VARCHAR, helpfulness INT)')

  await client.query('CREATE TABLE IF NOT EXISTS photos (id serial PRIMARY KEY NOT NULL, answer_id BIGINT, url VARCHAR)')

populateTableQuestions()
    .then(() => {
      console.log('changing questions sequence')
      client.query('SELECT MAX (question_id) FROM questions').then(res => {
        var newMax = res.rows[0].max + 2;
        client.query(`ALTER SEQUENCE questions_question_id_seq RESTART WITH ${newMax}`)
        .then(()=> {
          client.query('CREATE INDEX questions_product_id_idx ON questions (product_id)')
          .then(()=>{
            client.query('CREATE INDEX questions_product_id_question_id_idx ON questions (product_id, question_id)')
          })
        })
      });
    })
    .catch(err => { console.log('hcpc', err) })

  })()