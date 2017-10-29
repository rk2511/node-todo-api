var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;
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

app.delete('/todos/:id', (req,res) => {
var id=req.params.id;
if(!ObjectID.isValid(id)) {
  return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((doc) => {
  if(!doc) {
    return res.send(404).send();
  }
  res.send({doc});
  }, (err) => {
  res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server up on ${port}`);
});

module.exports.app = app;
