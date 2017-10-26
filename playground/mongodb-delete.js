//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todosapp', (err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB');
  }

  // db.collection('todos').deleteMany({text:'watch jigarthanda'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('todos').deleteOne({text:'test deleteone'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('todos').findOneAndDelete({completed:"false"}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('users').deleteMany({name:'vikki'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('users').findOneAndDelete({_id: '123abc'}).then((result) => {
    console.log(result);
  });
  //  db.close();
});
