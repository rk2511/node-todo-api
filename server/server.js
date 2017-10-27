var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: 'watch football'
// });
var newrec = new Todo({
  text: 'Test rec 1',
  completed: true,
  completedAt: 27102017
});

newrec.save().then((doc) => {
  console.log('Save todo',doc);
}, (err) => {
  console.log('Cant save todo', err);
});
