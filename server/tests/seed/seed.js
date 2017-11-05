const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
var userOneId = new ObjectID();
var userTwoId = new ObjectID();
var userThreeId = new ObjectID();

var todos = [{
  _id: new ObjectID(),
  text: 'This is dummy 1'
}, {
  _id: new ObjectID(),
  text: 'This is dummy 2',
  completed:true,
  completedAt:1111
}];

var users = [{
  _id: userOneId,
  email: 'abc@def.com',
  password: 'abcd1234',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'abcd@efgh.com',
  password: 'abcde123456'
},
{
  _id: userThreeId,
  email: 'abcdef@ghij.com',
  password: '12345abcde'
}];

// const populateUsers = (done) => {
// User.remove({}).then(() => {
// var userOne = new User(users[0]).save();
// var userTwo = new User(users[1]).save();
// return Promise.all([userOne,userTwo])
// }).then(() => done());
// };

const populateUsers = (done) => {
User.remove({}).then(() => {
var userOne = new User(users[0]).save();
var userTwo = new User(users[1]).save();
var userThree = new User(users[2]).save();
return Promise.all([userOne,userTwo,userThree])
}).then((user) => {
  //console.log(user);
  done();
});
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
