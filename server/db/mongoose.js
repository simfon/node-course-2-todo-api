var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var local = 'mongodb://localhost:27017/TodoApp';
var heroku = 'mongodb://heroku_csxrfxrp:ehc2s9nr8kruqquavm6eeb8ce8@ds247944.mlab.com:47944/heroku_csxrfxrp';

var db = process.env.MONGODB_URI || local;

mongoose.connect(db , { useNewUrlParser: true }).catch((err) => {
    console.log(err);
});

module.exports = {mongoose};