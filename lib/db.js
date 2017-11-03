const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

let db;

// const url = 'mongodb://localhost:27017/heroku_c1gkrdmp';
const url = 'mongodb://givelight:givelight@ds129023.mlab.com:29023/heroku_c1gkrdmp';
MongoClient.connect(url, (err, dbParam) => {
  assert.equal(null, err);
  console.log('Successfully connected to MongoDB server.');
  db = dbParam;
  db.collection("user").createIndex( { "email": 1 }, { unique: true } );
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

function get(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({_id: new ObjectID(id)}).toArray((err, result) => {
            if (err) {
                console.log('err', err);
                return reject(err);
            }
            return resolve(result[0]);
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

function updateOne(collection, obj) {
  return new Promise((resolve, reject) => {
    var query = { name: obj.name };
    db.collection(collection).updateOne(query, obj, (err, result) => {
      if (err) {
        console.log('err', err);
        return reject(err);
      }
      console.log(`Updated document in collection ${collection}`);
      return resolve(result);
    });
  });
}

module.exports = {
    getAll,
    get,
    insertOne,
    updateOne,
};
