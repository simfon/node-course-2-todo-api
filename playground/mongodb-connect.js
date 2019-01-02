//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to DB');
    const db = client.db('TodoApp');
    
    /* db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err){
            return console.log('Unable to insert', err);
        }

        console.log(JSON.stringify(result.ops));
    }); */

    /* db.collection('Users').insertOne({
        name: 'Simone',
        age: 40,
        location: 'Italy'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert to Users')
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    }); */

    client.close();
});