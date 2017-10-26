//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todosapp', (err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB');
  }
    // console.log('Connected to MongoDB');
    // db.collection('todos').find({
    //   _id: new ObjectID('59f0e812f01495acb84f9f12')
    // }).toArray().then((docs) => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //   console.log('unable to fetch docs', err);
    // });
    console.log('Connected to MongoDB');
    db.collection('users').find({name:'vikki'}).toArray().then((docs) => {
      console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
      console.log('unable to fetch', err);
    });


    // db.collection('todos').find().count().then((count) => {
    //   console.log('Todos count', count);
    //
    // }, (err) => {
    //   console.log('unable to fetch docs', err);
    // });
  //  db.close();
});
