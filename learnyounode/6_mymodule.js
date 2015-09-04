var fs = require('fs');

module.exports = function (dirpath, extension, callback) {
	extension = '.' + extension;

	fs.readdir(dirpath, function(err, files) {
		if (err) return callback(err);

		var filteredFiles = files.filter(function (file) {
			return file.indexOf(extension) !== -1;
		});

		callback(null, filteredFiles);
	});
};
