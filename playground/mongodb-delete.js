//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to DB');
    const db = client.db('TodoApp');
  
    // deleteMany
/*     db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) =>{
        console.log('Deleted', res);
    }).catch((err) => {
        console.log(err);
    });
 */
    // deleteOne
/*     db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) =>{
        console.log('Deleted one ', res);
    }).catch((err) => {
        console.log(err);
    }); */

    // findOneAndDelete
 /*    db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
        console.log('Deleted one ', result);
    }).catch((err) => {
        console.log(err);
    }); 
 */
    db.collection('Users').deleteMany({name: 'Simone'}).then((res) =>{
        console.log(`Deleted ${res.deletedCount} objects`);
    }).catch((err) => {
        console.log(err);
    });

    db.collection('Users').findOneAndDelete({name: 'Alice'}).then((response) => {
        console.log('Deleted: ', JSON.stringify(response, undefined, 2));
    }).catch((err)=>{
        console.log(err);
    });


    client.close();
});