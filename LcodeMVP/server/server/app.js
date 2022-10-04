const db = require('../../database/indexdb.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const partials = require('express-partials');
const port = process.env.PORT || 3000;
var cors = require('cors');
const { updateDMEPOS, getLCodes, getPrices } = require('../models/model.js')
const os = require('os')
const multer = require('multer')
const upload = multer({ dest: os.tmpdir() })
const fs = require('fs')
const {parse} = require('csv-parse')

const app = express();

app.use(cors())
app.use(partials());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/data`, upload.single('file'), (req, res) => {
  const file = req.file;
  const data = fs.readFileSync(file.path)
  async function updateRecords(data) {
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: 'An error occurred' })
      } else {
        updateDMEPOS(records)
      }
    })
  }
   updateRecords(data)
//query to database to update table
   getLCodes(res)

})

app.get('/data', (req, res) => {
  getLCodes(res)

})
app.get('/cost', (req, res) => {
  var codes = req.query.codes
  var billingZone = req.query.billingZone
  getPrices(codes, billingZone, res)
})

const server = app.listen(port, () => {
  console.log(`Q&A is listening on ${port}`);
});
