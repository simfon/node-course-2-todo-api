var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).catch((err) => {
    console.log(err);
});

module.exports = {mongoose};