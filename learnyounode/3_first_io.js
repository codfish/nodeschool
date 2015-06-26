var fs = require('fs');
var filepath = process.argv[2];

// this is the simple way to get the string:
// var content = fs.readFileSync(process.argv[2]).toString();

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').leng
var content = fs.readFileSync(process.argv[2], {encoding: 'utf8'});
var numNewlines = content.split('\n').length - 1;

console.log(numNewlines);
