const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');

const app = express();
require('dotenv').load();
const client = require('redis').createClient(process.env.REACT_APP_REDIS);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

client.on('connect', () => {
  console.log('redis connect');
});

app.post('/', (req, res) => {
  const shorten = shortid.generate();
  const orig = req.body.url;
  client.set(shorten, orig);
  const retObj = { shorten, orig };
  res.end(JSON.stringify(retObj));
});

app.get('/:uid', (req, res) => {
  console.log('id in server', req.params.uid);
})

// app.all('/*', (req, res) => {
//   console.log('req is', req)
// })

module.exports = app;
