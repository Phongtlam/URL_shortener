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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

client.on('connect', () => {
  console.log('redis connect');
});

// client.get('', (err, replies) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     replies.forEach((reply) => {
//       console.log(reply);
//     })
//   }
// })

app.post('/', (req, res) => {
  const shorten = shortid.generate();
  const orig = req.body.url;
  console.log('shorten', shorten, orig)
  console.log(typeof(shorten), typeof(orig))
  client.set(shorten, orig, () => {
    const retObj = { shorten, orig };
    res.end(JSON.stringify(retObj));
  });
  client.get(shorten, (err, reply) => {
    console.log('saved data url', shorten, reply);
  })
});

app.route('/:url').all((req, res) => {
  const shortUrl = req.params.url;
  console.log('shortUrl', shortUrl);
  client.get(shortUrl, (err, reply) => {
    console.log('reply data', reply)
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
