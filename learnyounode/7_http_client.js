var http = require('http');

// NOTE:
// The response object / Stream that you get from http.get()
// also has a setEncoding() method. If you call this method
// with "utf8", the "data" events will emit Strings rather
// than the standard Node Buffer objects which you have to
// explicitly convert to Strings.
http.get(process.argv[2], function(response) {
	response.setEncoding('utf8');

	// my answer:
	// response.on('data', function (dataString) {
	// 	console.log(dataString);
	// });

	// nodeschools' solution:
	response.on('data', console.log); // #clever #clean
	response.on('error', console.error); // i keep forgetting to handle the errors!
});
