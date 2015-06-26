var fs = require('fs');
var dirpath = process.argv[2];
var extension = '.' + process.argv[3];

fs.readdir(dirpath, function(err, files) {
	var filteredFiles = files.filter(function(file) {
		return file.indexOf(extension) !== -1;
	});

	console.log(filteredFiles.join('\n'));
});
