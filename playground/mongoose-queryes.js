const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

var id = '5c2dcf146bd7172a08c8be42';
var badid = '6c2dcf146bd7172a08c8be42aa'
var userid = '5c2ceac60cd1ab37e834f794';
/* Todo.find({
    _id: badid
}).then((todos) => {
    console.log('Todos', JSON.stringify(todos));
}).catch((e) => console.log(e));

Todo.findOne({
    _id: badid
}).then((todo) => {
    console.log('Todo', JSON.stringify(todo));
}).catch((e) => console.log(e));
 */
/* if (!ObjectID.isValid(badid)) {
    return console.log('ID not valid');
}

Todo.findById(badid).then((todo) => {
    if (!todo) {
        return console.log('ID not found');
    }

    console.log('TodoID', JSON.stringify(todo));
}).catch((e) => console.log(e)); */

User.findById(userid).then((user) => {
    if (!user) {
        return console.log('User not found');
    } 

    console.log('User: ', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));