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
  console.log('shorten', shorten)
  client.set(shorten, orig, () => {
    const retObj = { shorten, orig };
    res.end(JSON.stringify(retObj));
  });
});

app.route('/:id').all(function (req, res) {
    // Get ID
    var id = req.params.id.trim();
    console.log('idddd', id)

    // Look up the URL
    client.get(id, function (err, reply) {
        if (!err && reply) {
            // Redirect user to it
            res.status(301);
            res.set('Location', reply);
            res.send();
        } else {
            // Confirm no such link in database
            res.status(404);
            res.render('error');
        }
    });
});

// app.get('/:id', (req, res) => {
//   const shortUrl = req.params.id;
//   console.log('short url', shortUrl)
//   res.redirect('https://matthewdaly.co.uk/blog/2014/11/09/building-a-url-shortener-with-node-dot-js-and-redis/')
//   // console.log('id in server', shortUrl);
//   // client.get(shortUrl, (err, reply) => {
//   //   if (!err && reply) {
//   //     // Redirect user to it
//   //     console.log('reply data', reply)
//   //     res.redirect(reply);
//   //   } else {
//   //     // Confirm no such link in database
//   //     res.status(404);
//   //     res.end('error');
//   //   }
//   // });
// });

// app.all('/*', (req, res) => {
//   console.log('req is', req)
// })

module.exports = app;
