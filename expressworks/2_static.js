var express = require('express');
var app = express();
var staticFilePath = process.argv[3] || './';
var port = process.argv[2];

app.listen(port);
app.use(express.static(staticFilePath));
