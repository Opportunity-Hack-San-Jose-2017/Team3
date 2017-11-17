const _ = require('lodash')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('./db')

function init(app) {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passphrase'
    },
        function (email, passphrase, done) {
            console.log("login in init????")
            console.log(email)
            console.log(passphrase)
            login({ email, passphrase }).then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            }).catch(error => {
                console.log('error in auth init', error)
                return done(error)
            })
        }
    ))

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.

    passport.serializeUser((user, done) => {
        done(null, user.email)
    })

    passport.deserializeUser((_id, done) => {
        db.getById('user', _id).then(user => {
            done(null, user)
        }).catch(err => {
            console.log('error in deserializeUser', err)
            done(err)
        })
    })
}

function login(credentials) {
    return new Promise((resolve, reject) => {
        db.findOne('user', { email: credentials.email }).then(doc => {
            if (credentials.facebookLogin) {
                return resolve(doc)
            }
            if (doc) {
                return bcrypt.compare(credentials.passphrase, doc.passphrase, (err, res) => {
                    if (res) {
                        // Passwords match
                        return resolve(doc)
                    }
                    // Passwords don't match
                    return reject()
                })
            }
        }).catch(err => {
            console.log('error in login', err)
            return reject(err)
        })
    })
}

function isAdmin(req) {
    return _.get(req, 'user.isAdmin')
}

module.exports = {
    init,
    isAdmin,
    login,
}