var http = require('http');

// NOTE:
// The response object / Stream that you get from http.get()
// also has a setEncoding() method. If you call this method
// with "utf8", the "data" events will emit Strings rather
// than the standard Node Buffer objects which you have to
// explicitly convert to Strings.
http.get(process.argv[2], 'utf8', function(response) {
  var databits = [];

  response.on('data', function (data) {
    databits.push(data);
  });
  response.on('error', console.error);

  response.on('end', function () {
    var data = databits.join('');
    console.log(data.length);
    console.log(data);
  });

  // Here's the official solution in case you want to compare notes:
  // var http = require('http')
  // var bl = require('bl')

  // http.get(process.argv[2], function (response) {
  //   response.pipe(bl(function (err, data) {
  //     if (err)
  //       return console.error(err)
  //     data = data.toString()
  //     console.log(data.length)
  //     console.log(data)
  //   }))
  // })
});
