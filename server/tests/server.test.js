const expect = require('expect');
const request = require('supertest');
var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
var todos = [{
  text: 'This is dummy 1'
}, {
  text: 'This is dummy 2'
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
