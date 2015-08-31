# Learn You Node Workshop

https://github.com/workshopper/learnyounode

13 total excercises. Here's the details of each excercise that I've completed (1 and 2 were straightforward, so I've left them out):


## MY FIRST I/O!

Exercise 3 of 13

Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.

The full path to the file to read will be provided as the first command-line argument. You do not need to make your own test file.

-------------------------------------------------------------------------------

**HINTS**

To perform a filesystem operation you are going to need the fs module from the Node core library. To load this kind of module, or any other "global" module, use the following incantation:

```js
var fs = require('fs')
```

Now you have the full fs module available in a variable named fs.

All synchronous (or blocking) filesystem methods in the fs module end with 'Sync'. To read a file, you'll need to use fs.readFileSync('/path/to/file'). This method will return a Buffer object containing the complete contents of the file.

Buffer objects are Node's way of efficiently representing arbitrary arrays of data, whether it be ascii, binary or some other format. Buffer objects can be converted to strings by simply calling the toString() method on them. e.g. var str = buf.toString().

If you're looking for an easy way to count the number of newlines in a string, recall that a JavaScript String can be .split() into an array of substrings and that '\n' can be used as a delimiter. Note that the test file does not have a newline character ('\n') at the end of the last line, so using this method you'll end up with an array that has one more element than the number of newlines.


## MY FIRST ASYNC I/O!

Exercise 4 of 13

Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.

The full path to the file to read will be provided as the first command-line argument.

-------------------------------------------------------------------------------

**HINTS**

The solution to this problem is almost the same as the previous problem except you must now do it the Node.js way: asynchronous.

Instead of fs.readFileSync() you will want to use fs.readFile() and instead of using the return value of this method you need to collect the value from a callback function that you pass in as the second argument. To learn more about callbacks, check out: [https://github.com/maxogden/art-of-node#callbacks](https://github.com/maxogden/art-of-node#callbacks).

Remember that idiomatic Node.js callbacks normally have the signature:

```js
function callback (err, data) { /* ... */ }
```

so you can check if an error occurred by checking whether the first argument is truthy. If there is no error, you should have your Buffer object as the second argument. As with readFileSync(), you can supply 'utf8' as the second argument and put the callback as the third argument and you will get a String instead of a Buffer.

-------------------------------------------------------------------------------

## FILTERED LS

Exercise 5 of 13

Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.

For example, if you get 'txt' as the second argument then you will need to filter the list to only files that end with .txt. Note that the second argument will not come prefixed with a '.'.

The list of files should be printed to the console, one file per line. You must use asynchronous I/O.

-------------------------------------------------------------------------------

**HINTS**

The fs.readdir() method takes a pathname as its first argument and a callback as its second. The callback signature is:

```js
function callback (err, list) { /* ... */ }
```

where list is an array of filename strings.

You may also find node's path module helpful, particularly the extname method.

-------------------------------------------------------------------------------

Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------

```js
var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + process.argv[3])
      console.log(file)
  })
})
```

-------------------------------------------------------------------------------


## MAKE IT MODULAR

Exercise 6 of 13

This problem is the same as the previous but introduces the concept of modules. You will need to create two files to solve this.

Create a program that prints a list of files in a given directory, filtered by the extension of the files. The first argument is the directory name and the second argument is the extension filter. Print the list of files (one file per line) to the console. You must use asynchronous I/O.

You must write a module file to do most of the work. The module must export a single function that takes three arguments: the directory name, the filename extension string and a callback function, in that order. The filename extension argument must be the same as what was passed to your program. Don't turn it into a RegExp or prefix with "." or do anything except pass it to your module where you can do what you need to make your filter work.

The callback function must be called using the idiomatic node(err, data) convention. This convention stipulates that unless there's an error, the first argument passed to the callback will be null, and the second will be your data. In this exercise, the data will be your filtered list of files, as an Array. If you receive an error, e.g. from your call to  fs.readdir(), the callback must be called with the error, and only the error, as the first argument.

You must not print directly to the console from your module file, only from your original program.

In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console.

These four things are the contract that your module must follow.

  * Export a single function that takes exactly the arguments described.
  * Call the callback exactly once with an error or some data as described.
  * Don't change anything else, like global variables or stdout.
  * Handle all the errors that may occur and pass them to the callback.

The benefit of having a contract is that your module can be used by anyone who expects this contract. So your module could be used by anyone else who does learnyounode, or the verifier, and just work.

-------------------------------------------------------------------------------

**HINTS**

Create a new module by creating a new file that just contains your directory reading and filtering function. To define a single function export, you assign your function to the module.exports object, overwriting what is already there:

```js
module.exports = function (args) { /* ... */ }
```

Or you can use a named function and assign the name.

To use your new module in your original program file, use the require() call in the same way that you require('fs') to load the fs module. The only difference is that for local modules must be prefixed with './'. So, if your file is named mymodule.js then:

```js
var mymodule = require('./mymodule.js')
```

The '.js' is optional here and you will often see it omitted.

You now have the module.exports object in your module assigned to the mymodule variable. Since you are exporting a single function, mymodule is a function you can call!

Also keep in mind that it is idiomatic to check for errors and do early-returns within callback functions:

```js
function bar (callback) {
  foo(function (err, data) {
    if (err)
      return callback(err) // early return

    // ... no error, continue doing cool things with `data`

    // all went well, call callback with `null` for the error argument

    callback(null, data)
  })
}
```

-------------------------------------------------------------------------------

Your solution to MAKE IT MODULAR passed!

Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------
solution.js:

```js
var filterFn = require('./solution_filter.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
  if (err)
    return console.error('There was an error:', err)

  list.forEach(function (file) {
    console.log(file)
  })
})
```
-------------------------------------------------------------------------------
solution_filter.js:

```js
var fs = require('fs')
var path = require('path')

module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err)
      return callback(err)

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}
```
-------------------------------------------------------------------------------


## HTTP CLIENT

Exercise 7 of 13

Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).

-------------------------------------------------------------------------------

**HINTS**

For this exercise you will need to use the http core module.

The http.get() method is a shortcut for simple GET requests, use it to simplify your solution. The first argument to http.get() can be the URL you want to GET; provide a callback as the second argument.

Unlike other callback functions, this one has the signature:

```js
function callback (response) { /* ... */ }
```

Where the response object is a Node Stream object. You can treat Node Streams as objects that emit events. The three events that are of most interest are: "data", "error" and "end". You listen to an event like so:

```js
response.on("data", function (data) { /* ... */ })
```

The "data" event is emitted when a chunk of data is available and can be processed. The size of the chunk depends upon the underlying data source.

The response object / Stream that you get from http.get() also has a setEncoding() method. If you call this method with "utf8", the "data" events will emit Strings rather than the standard Node Buffer objects which you have to explicitly convert to Strings.

-------------------------------------------------------------------------------

Your solution to HTTP CLIENT passed!

Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------
```js
var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})
```
-------------------------------------------------------------------------------


## HTTP COLLECT

Exercise 8 of 13

Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Collect all data from the server (not just the first "data" event) and then write two lines to the console (stdout).

The first line you write should just be an integer representing the number of characters received from the server. The second line should contain the complete String of characters sent by the server.

**HINTS**

There are two approaches you can take to this problem:

1) Collect data across multiple "data" events and append the results together prior to printing the output. Use the "end" event to determine when the stream is finished and you can write the output.

2) Use a third-party package to abstract the difficulties involved in collecting an entire stream of data. Two different packages provide a useful API for solving this problem (there are likely more!): bl (Buffer List) and concat-stream; take your pick!

  <http://npm.im/bl>
  <http://npm.im/concat-stream>

To install a Node package, use the Node Package Manager npm. Simply type:

```js
$ npm install bl
```

And it will download and install the latest version of the package into a subdirectory named node_modules. Any package in this subdirectory under your main program file can be loaded with the require syntax without being prefixed by './':

```js
var bl = require('bl')
```

Node will first look in the core modules and then in the node_modules directory where the package is located.

If you don't have an Internet connection, simply make a node_modules directory and copy the entire directory for the package you want to use from inside the learnyounode installation directory:

  file:///Users/codonnell/.ndenv/versions/v0.12.0/lib/node_modules/learnyounode/node_modules/bl
  file:///Users/codonnell/.ndenv/versions/v0.12.0/lib/node_modules/learnyounode/node_modules/concat-stream

Both bl and concat-stream can have a stream piped in to them and they will collect the data for you. Once the stream has ended, a callback will be fired with the data:

```js
response.pipe(bl(function (err, data) { /* ... */ }))
// or
response.pipe(concatStream(function (data) { /* ... */ }))
```

Note that you will probably need to data.toString() to convert from a Buffer.

Documentation for both of these modules has been installed along with learnyounode on your system and you can read them by pointing your browser here:

  file:///Users/codonnell/.ndenv/versions/v0.12.0/lib/node_modules/learnyounode/docs/bl.html
  file:///Users/codonnell/.ndenv/versions/v0.12.0/lib/node_modules/learnyounode/docs/concat-stream.html

-------------------------------------------------------------------------------
Here's the official solution in case you want to compare notes:

-------------------------------------------------------------------------------

```js
var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
});
```


## JUGGLING ASYNC

Exercise 9 of 13

This problem is the same as the previous problem (HTTP COLLECT) in that you need to use http.get(). However, this time you will be provided with three URLs as the first three command-line arguments.

You must collect the complete content provided to you by each of the URLs and print it to the console (stdout). You don't need to print out the length, just the data as a String; one line per URL. The catch is that you must print them out in the same order as the URLs are provided to you as command-line arguments.

-------------------------------------------------------------------------------

## HINTS

Don't expect these three servers to play nicely! They are not going to give you complete responses in the order you hope, so you can't naively just print the output as you get it because they will be out of order.

You will need to queue the results and keep track of how many of the URLs have returned their entire contents. Only once you have them all, you can print the data to the console.

Counting callbacks is one of the fundamental ways of managing async in Node. Rather than doing it yourself, you may find it more convenient to rely on a third-party library such as [async](http://npm.im/async) or [after](http://npm.im/after). But for this exercise, try and do it without any external helper library.

-------------------------------------------------------------------------------

