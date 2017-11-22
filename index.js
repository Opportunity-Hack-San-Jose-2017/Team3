#!/usr/bin/env node

const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const nodeExcel = require('excel-export')
const json2xls = require('json2xls')
const fs = require('fs')
//const nodeExcel = require('exceljs')

const app = express();
const db = require('./lib/db');
const auth = require('./lib/auth');

const port = parseInt(process.env.PORT, 10) || 3000;
const publicDir = __dirname + '/app';

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
auth.init(app);

app.get(['/', '/signup', '/login', '/profile'], (req, res) => {
    res.sendFile(path.join(publicDir, '/index.html'));
});

app.post('/api/login', (req, res, next) => {
    auth.login(req.body).then( response => {
        return res.json(response);
    }).catch(error => {
        console.log("fucking error", error)
        return res.json(error)
    })
    //why use this on login?
    // passport.authenticate('local', (err, user, info) => {
    //     console.log(err)
    //     console.log(user)
    //     console.log(info)
    //     if (err || user) {
    //         console.log('error with login:', err, user);
    //         return res.end();
    //     }
        
    // })(req, res, next);
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
        return res.json({ error: 'Not authenticated....' });
    }
});

app.get('/api/admin/user/exportData', (req, res) => {
    db.getAll('user').then((results) => {

        var headers = Object.keys(results[0])
        var conf ={}
        conf.stylesXmlFile = "./lib/styles.xml"
        conf.name = "UserData"
        conf.cols = headers
        
        var values = results.map( result => {
            delete result['passphrase']
            return Object.values(result)
        })
        console.log(values)
        var sheet = nodeExcel.execute(conf)
        fs.writeFileSync('./lib/volunteers.xlsx', sheet, 'binary')

        //res.setHeader('Content-Type', 'application/vnd.openxmlformats')
        //res.setHeader("Content-Disposition", "attachment; filename=" + "UserData.xlsx")
        const file = './lib/volunteers.xlsx'
        const filename = 'volunteers.xlsx'
        return res.download(file, filename)
    }).catch((error) => {
        console.log(error)
        return reject(error)
    })
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
