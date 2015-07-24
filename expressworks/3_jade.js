var express = require('express');
var app = express();
var port = process.argv[2];
var path = require('path');
app.set('view engine', 'jade');

// specify where views are located
var viewPath = process.argv[3] || './';
app.set('views', viewPath);

// data for view
var date = new Date().toDateString();

// set up route to serve your template
app.get('/home', function (req, res) {
	res.render('index', {
		date: date
	});
});

app.listen(port);
