var express = require('express');
var app = express();
var port = process.argv[2];

app.use(express.bodyParser());

app.set('view engine', 'jade');
app.set('views', './');

app.get('/', function (req, res) {
	res.render('form');
});

app.post('/path', function (req, res) {
	req.on('data', function(chunk) {
    console.log("Received body data:");
    console.log(chunk.toString());
  });
	// console.log(req.body);
	// var userInput = req.body.str;
	// res.end(userInput);
});

app.listen(port);
