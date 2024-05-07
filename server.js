/*
Server - A server is a person who communicates with clients
Analogy - server -> waiter
Analogy - chef -> database

A server is a computer program that's responsible for preparing and delivering data to other computers.
Web pages, images, videos or any additional information
*/

// Client (get/post/put/delete requests) <=> server/rest api (respond back json) <=> database

/*
JSON : Javascript object notation

- Imagine you're sending a message to your friend, and you want to include information like your name, age, and a list of your favourite hobbies.
- You can't just send the message as it is
- You need to organize the information in a way that both you and your friend understand.
- JSON is a bit like this organized format for exchanging data between computers.
- JSON is lightweight, structured and organized data
- In most contexts, JSON is represented as a string.

e.g.,
{
  "name": "Alice",
  "age": 25,
  "hobbies": ["reading", "painting", "hiking"]
}
*/

const jsonString =
  '{"name": "Alice","age": 25,"hobbies": ["reading", "painting", "hiking"]}';

// json.parse is used to convert a json string to json object
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject);

const obj = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'painting', 'hiking'],
};

// json.stringify is used to convert a json object to json string
// const jsonStr = JSON.stringify(obj);
// console.log(jsonStr);
// console.log(typeof jsonStr);

// What are API and Endpoints ?
/*
- Imagine a menu card in a restaurant
- Lots of options are there, each option will give you a different order
- Now, collection of that list i.e, menu card = API's
- And an option in that list - endpoint
- And the waiter only understood whatever things are written on the menu card
*/

/*
Create a server

- creating a server in node.js via express package
- Express.js is a popular framework for building web applications and apis.
- When you create an express.js application, you're setting up the foundation for handling incoming requests and defining how your application responds to them.

Now, we are going to create a server, i.e, waiter
So, the waiter has his own home.

- In simple terms, "localhost" refers to your own computer. After creating a server in node.js, you can access your environment in 'localhost'.

- what is port no. => Let's suppose in a building, there are 100 rooms, for someone to reach, we must know his room no., same is the concept of port no.

- localhost hamara ghar hai, aur port no. hamare exact location ki address hai, i.e, room no.
*/

/*
Methods to share data

- Now, in the world of web development, we need to deal with data.
- How data is sent and received b/w a client (like a web browser) and a sever (built with node.js)
- So, there are lots of methods out there to send or receive data according to their needs.

- GET
- POST
- PATCH
- DELETE

=> GET
- imagine you want to read a book on a library shelf.
- you don't want to change anything.
- you just want to get that information.

- similarily the get method is used to request data from the server.

- For e.g, when you enter a website url in your browser, your browser sends a get request to the server to fetch this web page.
*/

// Creating a server
const express = require('express');
const app = express(); // server is created as the name of app
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store the json data in req.body

const { castArray } = require('lodash');
const PORT = process.env.PORT || 3000;

// creating end points - menu points
// This means, if anyone goes to '/' after the url or its just localhost:3000, then the server will send request "hello world".

// db();

app.get('/', function (req, res) {
  res.send('Welcome to our hotel');
});

// localhost:3000/panner will get to this page
app.get('/panner', (req, res) => {
  res.send('Panner is very tasty');
});

app.get('/idli', (req, res) => {
  let customized_idli = {
    name: 'rava idli',
    size: '10cm diameter',
    is_sambar: true,
    is_chutney: false,
  };

  // It will send this object in json format
  res.send(customized_idli);
});

// app.post('/person', async (req, res) => {
  // const data = req.body;
  // Assuming the request body contains the person data
  // client ne data bheja, body-parser ne usko process krke req.body me save kr diya, jisko ki ham js object ke taur pe use kr skte hai

  // Create a new Person document(row) using the mongoose model

  // const newPerson = new Person();

  // We can assign all properties on by one
  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;

  // Else, we can pass the data as a parameter to Person schema, it will automatically create a document based on data.
  // const newPerson = new Person(data);

  // Save the new person to the database.

  // newPerson.save((error, person) => {
  //   if(error){
  //     console.log("Error saving person : ", error);
  //     res.status(500).json({error: "Internal server error"});
  //   }
  //   else{
  //     console.log('Data saved successfully');
  //     res.status(200).json(person);
  //   }
  // })

  // Now a days no one uses callback like this in the post method. They look quite complex.

  // Async & await are used for asynchronous code, such as n/w requests, file system operations or database queries, rather than callbacks.

  // Using try and catch block.

  // The try block contains the code for creating a new Person document and saving it to the database using await newPerson.save()

  // If an error occurs during any step, it is caught in the 'catch' block, and an error response is sent with a 500 internal server error status.
// });

/*
Async :-

- A async function is a function that is designed to work with asynchronous opeations. You declare a function as async by placing the async keyword before the function declaration.

- The primary purpose of an async function is to allow you to use the await keyword inside it, which simplifies working with promises and asynchronous code.

- Inside an async function, you can use await to pause the execution of the function until a promise is resolved. This makes the code appear more synchronous and easier to read.

Await :-

- The await keyword is used inside an async function to wait for the resolution of a promise. It can only be used within an async function. When await is used, the function pauses at that line until the promise is resolved or rejected. This allows you to write code that appears sequential even though it's performing asynchronous tasks.

- If the promise is resolved, the result of the promise is returned. If the promise is rejected, it throws an error that can be caught using try-catch block.
*/

// If we try to access such endpoint which is not defined here, then it will give error "not found"

// GET method to get the person
// It will fetch all the data(documents) from our collection 'people' from the database 'hotels'

// When we hit this url in the browser, we generally requesting the server to provide data, i.e, we are performing get request there.

// app.get('/person', async (req, res) => {
//   try{
//     const data = await Person.find();
//     console.log('Data fetched');
//     res.status(200).json(data);
//   }
//   catch(error){
//     console.log("Error : ", error);
//     res.status(500).json({error: 'Internal server error'});
//   }
// });

// In get method, server will respond back a data, i.e, we are fetching data from backend, but in post request, we are sending data to server at some endpoint, and backend will accept it.

// Fetching data of person based on work, i.e, parametirised api endpoints

// :work is a variable for type of work, i.e, chef, waiter or manager. We can give any name as we want, :work or :workType etc.

// app.get('/person/:workType', async (req, res) => {
//   try {
//     const workType = req.params.workType;  // Extract the work type from the URL parameter
  
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//       const response = await Person.find({work: workType});
//       res.status(200).json(response);
//     }
//     else{
//       res.status(404).json({error: 'Invalid work type'});
//     }
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(500).json({error: "Internal server error"});
//   }
// })

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

/*
Various status codes:

1. Informational reponses (100-199)
2. Successful responses (200-299)
3. Redirection messages (300-399)
4. Client error responses (400-499)
5. Server error responses (500-599)
*/

// Creating menu item - post method
// app.post('/menu', async (req, res) => {
//   try{
//     const data = req.body;
//     const menuItem = new MenuItem(data);
//     const response = await menuItem.save();
    
//     console.log("Menu saved successfully");
//     res.status(200).send(response);
//   }
//   catch(error){
//     console.log("Error : ", error);
//     res.status(500).json({error: 'Internal server error'});
//   }
// });

// Get menu item
// app.get('/menu', async (req, res) => {
//   try{
//     const menuData = await MenuItem.find();
//     console.log("Menu items fetched successfully");
//     res.status(200).json(menuData);
//   }catch(error){
//     console.log("Error : ", error);
//     res.status(500).json({error: "Internal server error"});
//   }
// });

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
}); // 3000 is the port no.