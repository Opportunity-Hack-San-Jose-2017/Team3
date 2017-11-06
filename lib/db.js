const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

let db;
let url;

if (process.env.NODE_ENV === 'production') {
    const mongoPass = require('../config/secret.json').mongo_db_password;
    url = `mongodb://givelight:${mongoPass}@ds129023.mlab.com:29023/heroku_c1gkrdmp`;
} else {
    url = 'mongodb://localhost:27017/heroku_c1gkrdmp';
}
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
    var query = {'_id': ObjectID(obj._id)};
    delete obj['_id'];
    console.log('am i being called joey')
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

function makeResponse(data, statusCode, error) {
    return {
        responseData: data,
        statusCode: statusCode,
        error: error
    }   
}
function loginUser(credentials) {
    return new Promise((resolve, reject) => {
        db.collection('user').findOne({email: credentials.email}, ((err, doc) => {
            console.log(doc)
            console.log(err)
            console.log(credentials)
            if (err) {
                console.log('err', err)
                return reject(err)
            }
            if (credentials.facbookLogin) {
                console.log('FACEBOOK LOGIN CALLED')
                return resolve(makeResponse(doc, 201, null))
            }
            if (doc && credentials.passphrase && credentials.passphrase === doc.passphrase) {
                console.log('PASSWORD CHECKED AND PASSED')
                return resolve(makeResponse(doc, 201, null))
            }
            else {
                console.log('PASSWORDS DID NOT MATCH')
                let error = {
                    error: true,
                    message: 'Invalid Credentials'
                }
                return reject(error)
            }
        }))
    })
}

module.exports = {
    getAll,
    get,
    insertOne,
    loginUser,
    updateOne,
};
