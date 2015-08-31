/*
Exercise 9 of 13

This problem is the same as the previous problem (HTTP COLLECT)
in that you need to use http.get(). However, this time you will
be provided with three URLs as the first three command-line arguments.

You must collect the complete content provided to you by each of the
URLs and print it to the console (stdout). You don't need to print out
the length, just the data as a String; one line per URL. The catch is
that you must print them out in the same order as the URLs are provided
to you as command-line arguments.
*/

var http = require('http');
var urls = [process.argv[2], process.argv[3], process.argv[4]];
var bods = [];
var totalbods = 0;

function fetch(i) {
  http.get(urls[i], 'utf8', function (response) {
    var data = '';

    response.on('data', function (d) {
      data += d;
    });

    response.on('end', function () {
      bods[i] = data;
      totalbods++;
    });
  });
}

for (var i = 0; i < urls.length; i++) {
  fetch(i);
}

while (bods.length < 3) {
  continue;
}

for (var b = 0; b < urls.length; b++) {
  console.log(bods[b]);
}
