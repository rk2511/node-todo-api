var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
console.log(req.body);
var todo = new Todo({
  text: req.body.text
});

todo.save().then((doc) => {
  res.send(doc);
}, (err) => {
  res.status(400).send(err);
});

});
app.listen(3000, () => {
  console.log('Server up on 3000');
});
