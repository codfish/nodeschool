# Express Works Workshop

https://github.com/azat-co/expressworks

8 total excercises. Here's the details of each excercise that I've completed in Express Works:


## HELLO WORLD!

Exercise 1 of 8

Create an Express.js app that outputs "Hello World!" when somebody goes to /home.

The port number will be provided to you by expressworks as the first argument of
the application, ie. process.argv[2].

Run $ killall node  before verifying exercises (in your terminal on Mac OS X) to end any previous processes. For Windows, use taskkill /IM node.exe.

-------------------------------------------------------------------------------

**HINTS**

This is how we can create an Express.js app on port 3000, that responds with
a string on '/':

```js
var express = require('express')
var app = express()
app.get('/', function(req, res) {
  res.end('Hello World!')
})
app.listen(3000)
```

Please use process.argv[2] instead of a fixed port number:

```js
app.listen(process.argv[2])
```


##  STATIC

Exercise 2 of 8

Apply static middleware to serve index.html file without any routes.

Your solution must listen on the port number supplied by process.argv[2].

The index.html file is provided and usable via the path supplied by
process.argv[3]. However, you can use your own file with this content:

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>

-------------------------------------------------------------------------------

**HINT**

This is how you can call static middleware:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

For this exercise expressworks will pass you the path:

```js
app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));
```

Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------
```js
var path = require('path')
var express = require('express')
var app = express()

app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));

app.listen(process.argv[2])
```
-------------------------------------------------------------------------------


## JADE

Exercise 3 of 8

Create an Express.js app with a home page rendered by Jade template engine.

The homepage should respond to /home.

The view should show the current date using toDateString.

-------------------------------------------------------------------------------

**HINTS**

The Jade template file index.jade is already provided:

```js
h1 Hello World
p Today is #{date}.
```

This is how to specify path in a typical Express.js app when the folder is
'templates':

```js
    app.set('views', path.join(__dirname, 'templates'))
```

However, to use our index.jade, the path to index.jade will be provided as
process.argv[3].  You are welcome to use your own jade file!

To tell Express.js app what template engine to use, apply this line to the
Express.js configuration:

```js
app.set('view engine', 'jade')
```

Instead of Hello World's res.end(), the res.render() function accepts
a template name and presenter data:

```js
res.render('index', {date: new Date().toDateString()})
```

We use toDateString() to simply return the date in a human-readable format
without the time.

**NOTE**

When creating your projects from scratch, install the jade dependency with npm.

Again, the port to use is passed by expressworks to the application as process.argv[2].

Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------

```js
var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.set('views', process.argv[3])
app.get('/home', function(req, res) {
  res.render('index', {date: new Date().toDateString()})
})
app.listen(process.argv[2])
```



## GOOD OLD FORM

Exercise 4 of 8

Write a route ('/form') that processes HTML form input
(<form><input name="str"/></form>) and prints backwards the str value.

-------------------------------------------------------------------------------

**HINTS**

To handle POST request use the post() method which is used the same way as get():

```js
app.post('/path', function(req, res){...})
```

Express.js uses middleware to provide extra functionality to your web server.

Simply put, a middleware is a function invoked by Express.js before your own
request handler.

Middlewares provide a large variety of functionalities such as logging, serving
static files and error handling.

A middleware is added by calling use() on the application and passing the
middleware as a parameter.

To parse x-www-form-urlencoded request bodies Express.js can use urlencoded()
middleware from the body-parser module.

```js
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
```

Read more about Connect middleware here:

  [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

The documentation of the body-parser module can be found here:

  [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)

Here is how we can flip the characters:

```js
req.body.str.split('').reverse().join('')
```

**NOTE**

When creating your projects from scratch, install the body-parser dependency
with npm by running:

```js
$ npm install body-parser
```


…in your terminal.

Again, the port to use is passed expressworks to the application as process.argv[2].


## 


