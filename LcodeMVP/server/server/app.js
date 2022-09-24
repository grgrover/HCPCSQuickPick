const db = require('../../database/indexdb.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const partials = require('express-partials');
const port = process.env.PORT || 3000;



const app = express();


app.use(partials());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/data`, (req, res) => {

})


const server = app.listen(port, () => {
  console.log(`Q&A is listening on ${port}`);
});
