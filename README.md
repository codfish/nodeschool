# NodeSchool

This project is just tracking [my own progress](#my-workshop-progress) in the different workshops that [nodeschool.io](http://nodeschool.io/) offers. This is not really an application to be used but more of just a small node reference for myself (and others).

I first learned about NodeSchool from going to the [NY JavaScript Meetup](http://www.meetup.com/NY-JavaScript/events/222043177/) at the [MongoDB](https://www.mongodb.org/) office in midtown Manhattan.


### Getting Started

If you're just curious about NodeSchool in general and not necessarily interested in my versions of the excercises, go to http://nodeschool.io/ and get started by following the simple steps on their site.

If you're like me and just want to look at the code for reference, go right ahead.

If you're interested in running my examples, run the following in your terminal excercises:

```sh
# refer to nodeschool.io for all workshop installation instructions
# npm install may need sudo. You also may need to open a new terminal
# session in order to start using the learnyounode command.
$ npm install -g learnyounode
$ git clone git@github.com:codonnell822/nodeschool.git
```

Now, let's make the assumtion to want to run the "learnyounode" workshop and you wanted to run the first excercise, "HELLO WORLD":

```sh
$ cd nodeschool/learnyounode
# run `learnyounode list` to get a full list of excercises to choose from
$ learnyounode select HELLO WORLD
$ learnyounode verify 1_hello_world.js
```

That's it! The `learnyounode` program should have outputted the results of the first excersise, along with a pass or fail for my code and their version of the correct answer.


### My Workshop Progress

[learnyounode](learnyounode/) - "Learn the basics of node: asynchronous i/o, http."
