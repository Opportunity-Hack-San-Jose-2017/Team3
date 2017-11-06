#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const db = require('./lib/db');

const port = parseInt(process.env.PORT, 10) || 3000;
const publicDir = __dirname + '/app';

app.use(bodyParser.json());

app.get(['/', '/signup', '/login', '/profile'], function (req, res) {
  res.sendFile(path.join(publicDir, '/index.html'));
});


app.post('/loginUser', (req, res) => {
  db.loginUser(req.body).then(user => {
      return res.json(user);
    }).catch( error => {
        console.log(error)
        return res.json(error)
    });
});
app.get('/users', (req, res) => {
    db.getAll('user').then(users => {
      return res.json({users});
    });
});

app.get('/user/:id', (req, res) => {
    db.get('user', req.params.id).then(user => {
      return res.json({user});
    });
});

app.post('/user', (req, res) => {
  db.insertOne('user', req.body).then(result => {
    return res.json(result);
  }).catch( error => {
    console.log(error)
    return res.status(422).json(error)
  });
});

app.put('/user', (req, res) => {
  console.log(req.body)
  db.updateOne('user', req.body).then(result => {
    return res.json(result);
  }).catch( error => {
    console.log(error)
    return res.json(error)
  });
});

app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log('Simple static server showing %s listening at port %s', publicDir, port);
app.listen(port);
