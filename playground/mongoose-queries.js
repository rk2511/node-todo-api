var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose.js');
var {Todo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');
var id = '59f368c0c2a670e80fb9ce9f';

if(!ObjectID.isValid(id)) {
  console.log('Invalid ID');
}
User.findById(id).then((doc) => {
  if(!doc) {
    return console.log('No such doc');
  }
  console.log('Doc:' , doc);
}).catch((err) => {
  console.log('Cant process', err);
})
// if(!ObjectID.isValid(id)) {
//   console.log('Invalid ID');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo ID', todo);
// }).catch((err) => {
//   console.log(err);
// });
