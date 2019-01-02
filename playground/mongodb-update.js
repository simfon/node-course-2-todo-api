//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to DB');
    const db = client.db('TodoApp');
    
    /* db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c2cca80cabe9e1db8978299')},
                                            {$set: {
                                                completed: true
                                                }
                                            },
                                            {
                                                returnOriginal: false
                                            }
                                            ).then((res) => {
        console.log(JSON.stringify(res,undefined,2));
    }).catch((err) => {
        console.log(err);
    });
 */
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5c2ccbccda469b3a64cae73b') },
        {
            $set: {
                name: 'Simone'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }).then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        }).catch((err) => {
            console.log(err);
        });


    client.close();
});