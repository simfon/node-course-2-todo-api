const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abca';

/* bcrypt.genSalt(15, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
}) */

bcrypt.genSalt(15).then((salt) => {
    bcrypt.hash(password, salt).then((hash) => {
        console.log(hash);
        bcrypt.compare(password, hash, (err, res) => {
            console.log(res);
        });
    });
}).catch((err) => {
    console.log(err);
});



/*  var data = {
     id: '5c2df620f63a8914ec37d034'
 };

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token + 1, '123abc');
console.log('decoded', decoded);
 */
// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// var data = {
//     id: '5c2df620f63a8914ec37d034'
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// /* token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString(); */

// console.log(JSON.stringify(token,undefined,2));

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }