const db = require('../../database/indexdb.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const partials = require('express-partials');
const port = process.env.PORT || 3000;
var cors = require('cors');
const parse = require('csv-parse').parse
const os = require('os')
const multer = require('multer')
const upload = multer({ dest: os.tmpdir() })
const {updateDMEPOS, getLCodes} = require('../../database/etl.js')
const fs = require('fs')


const app = express();

app.use(cors())
app.use(partials());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/data`, upload.single('file'), (req, res) => {
  const file = req.file;
  const data = fs.readFileSync(file.path)
  async function updateRecords() {
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: 'An error occurred' })
      }
      updateDMEPOS(records)
    })
  }
  updateRecords()
  .then(()=>{
    getLCodes()
    .then((data)=>{res.send(data)})
    .catch(err=>{res.sendStatus(500).send(err)})
    })
  .catch(err=>{res.sendStatus(400).send(err)})


})

app.get('/data', (req, res)=>{
  getLCodes(res)

})


const server = app.listen(port, () => {
  console.log(`Q&A is listening on ${port}`);
});
