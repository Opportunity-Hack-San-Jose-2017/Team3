const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db;

const url = 'mongodb://givelight:givelight@ds129023.mlab.com:29023/heroku_c1gkrdmp';
MongoClient.connect(url, (err, dbParam) => {
  assert.equal(null, err);
  console.log('Successfully connected to MongoDB server.');
  db = dbParam;
});

function getAll(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                console.log('err', err);
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function insertOne(collection, obj) {
    return new Promise((resolve, reject) => {
        db.collection(collection).insertOne(obj, (err, result) => {
        if (err) {
            console.log('err', err);
            return reject(err);
        }
        console.log(`Inserted a document into collection ${collection}`);
        return resolve(result);
        });
    });
}

module.exports = {
    getAll,
    insertOne,
};