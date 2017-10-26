//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todosapp', (err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB');
  }
    console.log('Connected to MongoDB');
    // db.collection('todos').insertOne({
    //   text:"just testing things",
    //   status: "false"
    // }, (err, result) => {
    //   if(err) {
    //     return console.log('Unable to insert rec', err);
    //   }
    //   console.log(JSON.stringify(result.ops,undefined,2));
    // })//
    // db.collection('users').insertOne({
    //   //_id: "123abc",
    //   name: "vikki",
    //   age: "26",
    //   location: "chennai"
    // }, (err,result) => {
    //   if(err) {
    //     return console.log('cannot insert users collection', err);
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // });
    db.close();
});
