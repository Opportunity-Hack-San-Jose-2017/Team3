const assert = require('assert')
const bcrypt = require('bcrypt')
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
//const nodeExcel = require('excel-export')
const json2xls = require('json2xls')
const fs = require('fs')
const nodeExcel = require('exceljs')

const MongoDB = require('../config/projectInfoData.json')['mongoData']

let db
let url

if (process.env.NODE_ENV === 'production') {
    const mongoPass = require('../config/secret.json').mongo_db_password
    url = MongoDB['productionURL'].replace('<password>', mongoPass)
} else {
    url = MongoDB['localURL']
}
MongoClient.connect(url, (err, dbParam) => {
    assert.equal(null, err)
    console.log('Successfully connected to MongoDB server.')
    db = dbParam
    db.collection('user').createIndex({ 'email': 1 }, { unique: true })
    return
})

function getAll(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                console.log('err', err)
                return reject(err)
            }
            return resolve(result)
        })
    })
}

function getById(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({ _id: new ObjectID(id) }).toArray((err, result) => {
            if (err) {
                console.log('getById err', err)
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

function insertOne(collection, obj) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(obj.passphrase, 10, (err, hash) => {
            // Store hash in database
            obj.passphrase = hash
            db.collection(collection).insertOne(obj, (err, result) => {
                if (err) {
                    console.log('insertOne err', err)
                    return reject(err)
                }
                return resolve(result)
            })
        })
    })
}

function updateOne(collection, obj) {
    return new Promise((resolve, reject) => {
        var query = { '_id': ObjectID(obj._id) }
        obj._id = ObjectID(obj._id)
        db.collection(collection).updateOne(query, obj, (err, result) => {
            if (err) {
                console.log('updateOne err', err)
                return reject(err)
            }
            return resolve(result)
        })
    })
}

function findAll(collection, query) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(query).toArray((err, result) => {
            if (err) {
                console.log('err', err)
                return reject(err)
            }
            return resolve(result)
        })
    })

}
function findOne(collection, query) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(query).toArray((err, result) => {
            if (err) {
                console.log('err', err)
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

module.exports = {
    getAll,
    getById,
    findOne,
    findAll,
    insertOne,
    updateOne,
}
