const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');
const redis = require('redis');

const app = express();
require('dotenv').load();

const client = redis.createClient(process.env.REACT_APP_REDIS);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

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
  client.set(shorten, orig, () => {
    const retObj = { shorten, orig };
    res.end(JSON.stringify(retObj));
  });
});

app.route('/:url').all((req, res) => {
  const shortUrl = req.params.url;
  client.get(shortUrl, (err, reply) => {
    if (reply) {
      // Redirect user to it
      res.redirect(reply);
    } else {
      // Confirm no such link in database
      res.status(404);
      res.end('error');
    }
  });
});

module.exports = app;
