var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose.js');
var {Todo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');
var id = '59f368c0c2a670e80fb9ce9f';
//
// if(!ObjectID.isValid(id)) {
//   console.log('Invalid ID');
// }

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

Todo.findByIdAndRemove('59f61efbcca7ec840a6ebceb').then((res) => {
  console.log(res);
});
