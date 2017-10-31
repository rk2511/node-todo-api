require('./config/config.js');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT;
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

app.patch('/todos/:id', (req,res) => {
  var update = {
    // text:'',
    // completed:null,
    // completedAt:null
  }
var id=req.params.id;
console.log(req.body);

// var body = _.pick(req.body, ['text', 'completed']);
// if(!ObjectID.isValid(id)) {
//   return res.status(404).send();
// }
// if(_.isBoolean(body.completed) && body.completed) {
// body.completedAt = new Date().getTime();
//
// } else {
// body.completed = false;
// body.completedAt = null;
// }

if(typeof(req.body.completed) == 'undefined' && typeof(req.body.text) == 'undefined') {
  console.log(req.body.completed);
  console.log(req.body.text);
  return res.status(400).send('Please send a data');
}

if (req.body.completed) {
  if(!(typeof(req.body.completed) == 'boolean')) {
    return res.status(400).send('Invalid status value');
  }
}

if(req.body.completed && req.body.completed == true) {
  //need to add check for already true update
  Todo.findById(id).then((doc) => {
    if(!doc) {
      return res.status(400).send('No such todo');
    }
    console.log('coming here', doc);
    if(doc.completed == true) {
      return res.status(400).send('Already completed');
    }
  }).catch((err) => {
      return res.status(400).send('some error');
  });

  update.completed = req.body.completed;
  update.completedAt = new Date().getTime();

} else {
  update.completed = false;
  update.completedAt = null;
}

if(req.body.text) {
  update.text = req.body.text;
}

Todo.findByIdAndUpdate(id,{$set: update}, {new: true}).then((todo) => {
  if(!todo) {
    return res.status(404).send();
  }
  res.send({todo})
}).catch((e) => {
  res.status(404).send();
});

});

app.post('/users', (req,res) => {
  var email = req.body.email;
  var password = req.body.password;
  //var token = req.body.token;
  var user = new User({
    email: email,
    password: password
  });
  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
  //  res.header('x-auth', token).send({_id:user._id, email:user.email});
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    console.log('is it coming here');
    res.status(400).send(err);
  });

});

app.listen(port, () => {
  console.log(`Server up on ${port}`);
});

module.exports.app = app;
