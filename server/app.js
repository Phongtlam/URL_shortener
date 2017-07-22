const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').load();

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
