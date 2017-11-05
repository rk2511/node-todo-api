const expect = require('expect');
const request = require('supertest');
var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
const {ObjectID} = require('mongodb');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed.js')
beforeEach (populateUsers);
beforeEach (populateTodos);

describe('POST api test', () => {
  it('should test create todo', (done) => {
    var text = 'just some test text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      console.log(res.body);
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err) {

        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  it('Should not work', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => {
        done(err);
      });

    });

  });

});

describe('GET api test', () => {

  it('Should fetch all', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('Get todo with id', () => {

  it('should return todo', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 when not found', (done) => {
    var id=new ObjectID().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .expect((res) => {
      expect(res.text).toBe('Not found');
    })
    .end(done);
  });

  it('Should return 404 when invalid', (done) => {
    request(app)
    .get('/todos/abcd')
    .expect(404)
    .end(done);
  });

});

describe('Get todo with id and delete', () => {

it('Should delete a todo', (done) => {
request(app)
.delete(`/todos/${todos[0]._id.toHexString()}`)
.expect(200)
.expect((res) => {
  expect(res.body.doc.text).toBe(todos[0].text);
})
.end((err,res) => {
  if(err) {
    return done(err);
  }
  var id = todos[0]._id.toHexString();
  Todo.findById(id).then((todos) => {
    expect(todos).toNotExist();
    done();
  }).catch((err) => {
    done(err);
  });
});
});

it('Should return 404 not found', (done) => {
  var id=new ObjectID().toHexString();
request(app)
.delete(`/todos/${id}`)
.expect(404)
.end(done);
});

it('Should return 404 when invalid', (done) => {
  request(app)
  .delete('/todos/abcd123')
  .expect(404)
  .end(done);
  });
});

describe('Patch update a todo' , () => {

});

describe('GET users/me', () => {

it('should authenitcate the user',  (done) => {
  request(app)
  .get('/users/me')
  .set('x-auth', users[0].tokens[0].token)
  .expect(200)
  .expect((res) => {
    expect(res.body._id).toBe(users[0]._id.toHexString());
    expect(res.body.email).toBe(users[0].email);
  })
  .end(done);
});

it('should return 401 for unauth user', (done) => {
  request(app)
  .get('/users/me')
  .set('x-auth', 'abcdef123')
  .expect(401)
  .expect((res) => {
    expect(res.body).toEqual({});
  })
  .end(done);
});
});

describe('POST users signup', () => {

  it('should signup the user', (done) => {
    var email = 'test@123.com';
    var password = '123abcd';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end(done);
  });

  it('should not signup if validation error', (done) => {
    var email = 'abc@abc.def';
    var password = '1234';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });

  it('should not signup if already signedup', (done) => {
    var email = 'abc@def.com';
    var password = '12345335';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });
});
