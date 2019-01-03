const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

/* Todo.remove({}).then((result) => {
    console.log(result);
}).catch((e) => console.log(e)); */

//Todo.findOneAndRemove

//Todo.findByIdAndRemove('5c2de1a36a1916b7b150cf67').then((res) => console.log(res)).catch((e) => console.log(e));

