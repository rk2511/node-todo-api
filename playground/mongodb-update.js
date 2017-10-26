//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todosapp', (err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB');
  }

// db.collection('todos').findOneAndUpdate({
//   _id: new ObjectID('59f0e812f01495acb84f9f12')
// }, {
//   $set : {
//     completed: "false"
//   }
// },{
//   returnOriginal:false
// }).then((result) => {
//   console.log(result);
// });

// db.collection('users').find().forEach( function(obj) {
//     obj.age= parseInt(obj.age);
//     db.collection('users').save(obj);
// });

db.collection('users').findOneAndUpdate({
  _id: new ObjectID('59f0d9098400591c384738a9')
},{
  $set : {
    name: 'vikki'
  },
  $inc: {
    age: 1
  }
},{
  returnOriginal:false
}).then((result) => {
  console.log(result);
});
  //  db.close();
});
