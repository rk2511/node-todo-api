const expect = require('expect');
const request = require('supertest');
var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
const {ObjectID} = require('mongodb');
var todos = [{
  _id: new ObjectID(),
  text: 'This is dummy 1'
}, {
  _id: new ObjectID(),
  text: 'This is dummy 2',
  completed:true,
  completedAt:1111
}];

beforeEach ((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

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
  it('')
});
