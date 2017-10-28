var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
var todo = new Todo({
  text: req.body.text
});

todo.save().then((doc) => {
  res.send(doc);
}, (err) => {
  res.status(400).send(err);
});

});

app.get('/todos', (req,res) => {
Todo.find().then((todos) => {
res.send({todos});
}, (err) => {
res.status(400).send(err);
  });
});

app.get('/todos/:id', (req,res) => {
var id=req.params.id;
  if(!ObjectID.isValid(id)) {
  return res.status(404).send('Invalid ID');
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Not found');
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send('Bad request');
  })
});

app.listen(3000, () => {
  console.log('Server up on 3000');
});

module.exports.app = app;
