//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to DB');
    const db = client.db('TodoApp');
  
/*     db.collection('Todos').find({
            _id: new ObjectID('5c2cce525adddd3ef96d67b8')
        }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch((err) => {
        console.log('Unable to fetch ', err)
    }) */
/* 
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }).catch((err) => {
        console.log('Unable to count ', err)
    }); */

    db.collection('Users').find({name: 'Alice'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    });

    client.close();
});