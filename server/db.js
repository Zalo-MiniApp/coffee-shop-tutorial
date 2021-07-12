const { MongoClient } = require('mongodb');

const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const dbname = process.env.MONGO_DBNAME
const uri = `mongodb+srv://${username}:${password}@cluster0.k6gxn.mongodb.net/${dbname}?retryWrites=true&w=majority`;

/**
 * Operation callback
 * @callback operation
 * @param {MongoClient} client - connected client
 */

/**
 * Process an operation with mongodb
 * @param {operation} operation the call back to process
 */
async function mongo(operation) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    return await operation(client)
  } catch (error) {
    console.error(error)
  } finally {
    client.close();
  }
}

async function listDatabases() {
  mongo(async client => {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  })
};

async function insertUser(user) {
  mongo(async client => {
    user = await client.db('highland').collection('users').insertOne(user);
    console.log(user, '<== INSERTED')
  })
};

async function listUsers() {
  const users = await mongo(async client => await client.db('highland').collection('users').find().toArray())
  return users
};

module.exports = {
  listDatabases,
  insertUser,
  listUsers
}