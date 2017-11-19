#!/usr/bin/env node

const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');

const app = express();
const db = require('./lib/db');
const auth = require('./lib/auth');

const port = parseInt(process.env.PORT, 10) || 3000;
const publicDir = __dirname + '/app';

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
auth.init(app);

app.get(['/', '/signup', '/login', '/profile/:id'], (req, res) => {
    res.sendFile(path.join(publicDir, '/index.html'));
});

app.post('/api/login', (req, res, next) => {
    if (req.body.facebookLogin) {
        // TODO: This is completely unsecure and temporary... need to replace react-facebook-login with https://github.com/jaredhanson/passport-facebook
        req.user = req.body;
        return res.json(req.user);
    } else {
        // See: https://github.com/jaredhanson/passport-local
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                console.log('error with login:', err, user);
                return res.end();
            }
            req.login(user, () => {
                return res.json(user);
            });
        })(req, res, next);
    }
});

app.get('/api/users', (req, res) => {
    if (auth.isAdmin(req)) {
        db.getAll('user').then(users => {
            return res.json({ users });
        });
    } else {
        return res.json({ error: 'You do not have permission to access this resource' });
    }
});

app.get('/api/user/:id', (req, res) => {
    if (req.isAuthenticated()) {
        db.getById('user', req.params.id).then(user => {
            return res.json({ user });
        });
    } else {
        return res.json({ error: 'Not authenticated' });
    }
});

app.post('/api/user', (req, res) => {
    db.insertOne('user', req.body).then(result => {
        return res.json(result);
    }).catch(error => {
        console.log(error)
        return res.status(422).json(error)
    });
});

app.put('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        db.updateOne('user', req.body).then(result => {
            return res.json(result);
        }).catch(error => {
            console.log(error)
            return res.json(error)
        });
    } else {
        return res.json({ error: 'Not authenticated' });
    }
});

app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log('Simple static server showing %s listening at port %s', publicDir, port);
app.listen(port);
