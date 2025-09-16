const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const database = {};

database.initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  } else {
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client.db();
        console.log(
          'Database initialized - connected to: ' + process.env.MONGODB_URI,
        );
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  }
};

database.getDatabase = () => {
  if (!_db) {
    throw Error('Database not initialized');
  } else {
    return _db;
  }
};

module.exports = database;
