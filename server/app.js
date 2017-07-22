const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/url', (req, res) => {
  console.log(req.body.url)
  const shortUrl = shortid.generate();
  console.log('short url', shortUrl);
});

module.exports = app;
