var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   var todo = new Todo(
       {
           text: req.body.text
       }
   ).save().then((doc) => {
        res.send(doc);
        console.log('Saved');
   }).catch((err) => {
       res.status(400).send(err);
   })

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Starting on port 3000');
})

module.exports = {app};