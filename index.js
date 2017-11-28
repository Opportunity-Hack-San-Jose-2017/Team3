#!/usr/bin/env node

const json2xls = require('json2xls')
const fs = require('fs')
//const nodeExcel = require('exceljs')
const _ = require('lodash')
const path = require('path')
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const errorHandler = require('errorhandler')
const cookieParser = require('cookie-parser')

const app = express()
const db = require('./lib/db')
const auth = require('./lib/auth')
const mailer = require('./lib/mailer')

const port = parseInt(process.env.PORT, 10) || 3000
const publicDir = __dirname + '/app'

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
auth.init(app)

app.get(['/', '/signup', '/login', '/profile/:id'], (req, res) => {
    res.sendFile(path.join(publicDir, '/index.html'))
})

app.post('/api/login', (req, res, next) => {
    // See: https://github.com/jaredhanson/passport-local
    passport.authenticate('local', (err, user, info) => {
        console.log(err)
        console.log(user)
        console.log(info)
        if (err || !user) {
            console.log('error with login:', err, user)
            return res.status(422).json(err)
        }
        req.login(user, () => {
            return res.json(user)
        })    
    })(req, res, next)

})

app.get('/api/auth/facebook', passport.authenticate('facebook'));

app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(`/profile/${req.user._id}`)
});

const prepareSearchQuery = (searchQuery) => {
    if (searchQuery.interests) {
        searchQuery.interests = {
            $in: searchQuery.interests
        } 
    }
    else if (searchQuery.skills) {
      searchQuery.skills = {
            $in: searchQuery.skills
        } 
    }
    var query = { $or: []}
    Object.keys(searchQuery).map( key => {
        var keyObj = {}
        keyObj[key] = searchQuery[key]
        query['$or'].push(keyObj)    
    })
    return query
}

app.post('/api/admin/search/users', (req, res) => {
    if (auth.isAdmin(req)) {
        console.log(req.body)
        searchQuery = prepareSearchQuery(req.body)
        db.findAll('user', searchQuery).then(users => {
            return res.json(users);
        });
    } else {
        return res.json({ error: 'You do not have permission to access this resource...' });
    }
});

app.get('/api/users', (req, res) => {
    if (auth.isAdmin(req)) {
        db.getAll('user').then(users => {
            return res.json({ users })
        })
    } else {
        return res.json({ error: 'You do not have permission to access this resource.' })
    }
})

app.get('/api/user/:id', (req, res) => {
    console.log('get USER ID happening')
    if (req.user) {
        var user = req.user
        return res.json({ user });
    }
    else {
        db.getById('user', req.params.id).then(user => {
            console.log('get finishing')
            req.user = user
            console.log(req.user)
            return res.json({ user })
        })
    }
})

app.get('/api/admin/users', (req, res) => {
    console.log('get USERS happening')
    console.log(req.user)
    if (auth.isAdmin(req)) {
        db.getAll('user').then((results) => {
            return res.json(results)
        }).catch((error) => {
            console.log(error)
            return res.status(422).json(error)
        })
    }
    else {
        return res.json({ error: 'You do not have permission to access this resource.....' })

    }
})

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
    // It is good practice to specifically pick the fields we want to insert here *in the backend*,
    // even if we have already done so on the front end. This is to prevent malicious users
    // from adding unexpected fields by modifying the front end JS in the browser.
    console.log(req.body)
    db.insertOne('user', _.pick(req.body, [
        'name', 'email', 'country', 'region', 'phone', 'interests', 'passphrase', 'skills'
    ])).then(result => {
        var userRecord = req.body
        userRecord.recordType = "New User"
        mailer.notifyAdmin(userRecord)
        return res.json(result)
    }).catch(error => {
        console.log(error)
        return res.status(422).json(error)
    })
})

app.put('/api/user', (req, res) => {
    if (req.user) {
        db.updateOneById('user', req.body).then(result => {
            var userRecord = req.body
            userRecord.recordType = "User Profile Update"
            mailer.notifyAdmin(userRecord)
            return res.json(result)
        }).catch(error => {
            console.log(error)
            return res.json(error)
        })
    } else {
        return res.json({ error: 'Not authenticated' })
    }
})

app.use(express.static(publicDir))
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}))

console.log('Simple static server showing %s listening at port %s', publicDir, port)
app.listen(port)
