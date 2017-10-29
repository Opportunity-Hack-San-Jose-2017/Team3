#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const db = require('./lib/db');

const port = parseInt(process.env.PORT, 10) || 8000;
const publicDir = process.argv[2] || __dirname + '/app';

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, '/index.html'));
});

app.get('/users', (req, res) => {
    db.getAll('user').then(users => {
      return res.json({users});
    });
});

app.post('/user', (req, res) => {
  db.insertOne('user', req.body).then(result => {
    return res.json(result);
  });
});

app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log('Simple static server showing %s listening at port %s', publicDir, port);
app.listen(port);
