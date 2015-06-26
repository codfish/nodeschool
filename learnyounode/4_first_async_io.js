var fs = require('fs');
var filepath = process.argv[2];

fs.readFile(filepath, function(err, buffer) {
	var numlines = buffer.toString().split('\n').length - 1;
	console.log(numlines);
});

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFile, then you'll get a String!
//
// fs.readFile(file, 'utf8', callback) can also be used
// fs.readFile(file, {encoding: 'utf8'}, callback) can also be used
