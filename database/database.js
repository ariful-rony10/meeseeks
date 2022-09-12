const mongodb = require('mongodb');

const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';

let databaseName = null;

const connectToDatabase = async () => {
  const client = await new MongoClient(url);
  databaseName = client.db('meeseeks');
};

const getDb = () => {
  if (!databaseName) {
    throw new Error('You must connect to database first!');
  }
  return databaseName;
};

module.exports = {
  connectToDatabase,
  getDb,
};
