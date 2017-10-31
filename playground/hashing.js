const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id: 123
}
var token = jwt.sign(data,'abc');
console.log(token);

var decoded = jwt.verify(token,'abc');
console.log(decoded);
// var message="a";
// var hash = SHA256(message).toString();
//
// console.log(`Hash value is ${hash}`);
