var getFileTypesInDir = require('./6_mymodule');
var dirpath = process.argv[2];
var extension = process.argv[3];

getFileTypesInDir(dirpath, extension, function (err, files) {
  if (err) {
  	return console.error('There was an error:', err);
	}

	console.log(files.join('\n'));
});
