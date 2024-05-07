/*
npm init - The npm init command is a command-line instruction that sets up a new or existing npm package, or creates a new workspace within a project.

package.json - Ensure a list of packages with their version
// Analogy - List of cloths you want to purchase with size and all, it also consists of other metadata like name and all.

package-lock.json -> Ensure details of every package installed with version, sub dependencies, store details, discount, everything.. It's like a detailed bill.

Both files work together to ensure smooth development for you and your team.

// NODEMON
Nodemon is a command-line tool that helps develop Node.js applications by automatically restarting the node application when file changes are detected in the directory

// Core Modules of NodeJS
There are many built-in modules in node js.
fs module - It creates a file and writes the message inside
os module - Learn os.userInfo(), Log username
*/

console.log('Server file is running');

// Understanding callback functions - It's like a function calling different functions.
function add(a, b, func) {
  console.log('Sum is : ', a + b);
  func();
}

add(44, 56, function func() {
  console.log('Hello how are you');
});

// Importing modules
// This is commonJS syntax

var fs = require('fs'); // file system module
var os = require('os'); // os module

// In ES6 module syntax, it is written as : import fs from 'fs'

var user = os.userInfo(); // gives info about current user of the os
console.log(user);
console.log('Username', user.username);

// fs.appendFile:  Asynchronously append data to a file, creating the file if it does not yet exist.
fs.appendFile('greetings.txt', '\nHi! ' + user.username + '\nHow are you', () => {
  console.log('File is created');
});

// syntax of appendFile : fs.appendFile(filepath, data, callback function)

// Importing data from any file
const notes = require('./Class01_notes');
console.log('Notes file is available');

var age = notes.age;
console.log('Age : ', age);
var result = notes.addNumber(4, 5);
console.log('Result : ', result);

// Lodash - Lodash is a JavaScript library that works on the top of underscore.js. It provides various inbuilt functions for collections, arrays, to manipulate objects, and other utility methods that we can use directly instead of writing them from scratch. It makes it easier to iterate over the arrays, strings as well as objects. Its modular methods enable the creation of composite functions easier.

var _ = require('lodash');
var data = ['person', 'person', 1, 2, 1, 2, 'name', 'name', 2];
console.log(_.uniq(data)); // uniq function of lodash returns only the unique values of any array.
console.log(_.isString('Hello'));
