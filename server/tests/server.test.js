const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));

            })
    });

});

describe('GET /todo', () => {

    it('should GET all user Todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });


});

describe('GET /todos/:id', () =>{

    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return a 404 if Todo not found', (done) => {
        var newID = new ObjectID();
        request(app)
            .get(`/todos/${newID.toHexString}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should NOT return todo doc created by other user', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {

    it('should remove a Todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should NOT remove a Todo of another user', (done) => {
        var hexID = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toExist();
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return 404 if not found', (done) => {
        var newID = new ObjectID();
        request(app)
            .delete(`/todos/${newID.toHexString}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);

    });

    it('should return 404 if ObjectID is invalid', (done) => {
        request(app)
        .delete('/todos/123')
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });


});

describe('PATCH /todos/:id', () => {

    it('should update the todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'Whatever you like';
        var completed = true;

        request(app)
            .patch(`/todos/${hexID}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                completed
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should NOT update the todo for another user', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'Whatever you like';
        var completed = true;

        request(app)
            .patch(`/todos/${hexID}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                completed
            })
            .expect(404)
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'Whatever you like';
        var completed = false;

        request(app)
            .patch(`/todos/${hexID}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text,
                completed
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    }); 
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
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

    it('should return 401 if not authenticate', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /user', (done) => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123amb!';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                })
            });
    });

    it('should return validation error if request invalid', (done) => {
        var email = 'nonesisto.com';
        var password = 'nonesisto';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = 'simone@simone.com';
        var password = '123amb!';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {

    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: 'second@user.com',
                password: 'userTwoPass'
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                User.findById(users[1]).then((user => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                })).catch((e) => done(e));
            })
    });
 
    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: 'second@user.com',
                password: 'asdfa'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                User.findById(users[1]).then((user => {
                    expect(user.tokens.length).toBe(1);
                    done();
                })).catch((e) => done(e));
            })
    }); 

});

describe('POST /users/me/token', () => {

    it('should remove a Token', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            })
    })
});