/*
Database

- web dev = client + server + db
- Let's suppose we are going to open restaurant and there is lots of data around it; like no. of chefs, each person detail(can be chef, owner, manager, waiter etc.), menu details.. etc
- We have to store all these data to run a fully functional restaurant website.
- Lots of database in the market 
  - sql
  - postgreSQL
  - mongoDB
  - mariaDB
  - Oracle

- Databases typically have their own server systems to manage and provide access to the data they store.
- These databases server systems are separate from node.js servers but work together to create dynamic and data-driven web applications.
*/

/*
Node.js server and database server

- A database server is specialized computer program or system that manages databases. It stores, retrieves, and manages data efficiently.
- The db server stores your application's data. When your node.js server needs data, it sends requests to the db server, which then retrieves and sends the requested data back to the node.js server.
- Node.js server is responsible for handling http requests from clients (like web browsers) and returning responses.
- It processes these requests, communicates with the db server, and sends data to clients.

Database server       (mongodb driver)       Backend server    (Rest API calls)   client
(MongoDB Atlas db)   <----------------->  (node with express)      <------->    react appln.
*/

/*
setup mongoDB

Q: So, as we are creating backend server, as same we need to do to create a db server as well?
Ans: NO, mongoDB provides with prebuilt server.
*/

/*
In SQL, we store data in form of rows and columns in a table. But in mongodb, we store data in collection, in the form of document, and every document have some fields.

MongoDB is a document database which is often referred to as a non-relational database.

e.g
[
  {
    _id: 'h2h43j4h3',
    name: 'Andrew',
    email: 'andrew@example.com',
    password: '234789234'
  },
  {
    
  },
  ...
]

sql           mongodb
database  ->  database
table     ->  collection
column    ->  field
row       ->  documents

Mongodb provides every record an unique id.
*/

/*
// MongoDB Query API
The MongoDB Query API is the way you will interact with your data.

The MongoDB Query API can be used two ways:
CRUD Operations and Aggregation Pipelines

MongoDB Query API Uses :-
- Adhoc queries with mongosh, Compass, VS Code, or a MongoDB driver for the programming language you use.
- Data transformations using aggregation pipelines.
- Document join support to combine data from different collections.
- Graph and geospatial queries.
- Full-text search.
- Indexing to improve MongoDB query performance.
- Time series analysis.
*/

/* MonogDB queries : 

1. show databases -> list of all databases

2. use db  -> Use that particular database "db" or create a new database "db" if not present. In MongoDB, a collection is not actually created until it gets content!

3. show collections  -> show all tables of a database

4. Create a collection: db.createCollection("users")  => It will create a collection names "users" in database db.

5. Insert documents (rows)
  - To insert a single document : 
  db.users.insertOne({u_id: 1, username: "Jyotiranjan", age: 22})
  {
    acknowledged: true,
    insertedId: ObjectId('662d2e055db6e4c74346b799')
  }

  In mongoDb, every document will get an unique id (_id) which is provided by mongodb itself.

  - To insert multiple documents: 
  db.users.insertMany([]
    {
      u_id: 2, username: "Aashwasti", age: 21
    },
    {
      u_id: 3, username: "SSD", age: 22
    }
  ])

6. find(): To select data from a collection in MongoDB, we can use the find() method. It is similar to select * from users

e.g: db.users.find()

7. findOne(): returns the first document of the collection.

8. find() and findOne() are also used to filter data based on conditions, just like select * from users where <condition>

e.g. db.users.find({age: 22})   => It will return all those documents where age is 22.

db.users.findOne({age: 22})  => It will return the first occurence of the document where age is 22.

9. Projection
Both find methods accept a second parameter called projection. This parameter is an object that describes which fields to include in the results.

Note: This parameter is optional. If omitted, all fields will be included in the results.

e.g: db.users.find({}, {username: 1, age: 1})
This will project all the documents showing the username and age fields.
The _id field is by default projected everytime. To not project that, we can write _id: 0

Note: You can't use 0 and 1 in the same object while projection, only _id is special case, otherwise you will get error

e.g
db.users.find({}, {_id: 0, username: 1})  => correct
db.users.find({}, {_id: 0, username: 1, age: 0})  => error

10. In sql => select * from users where age > 21
In mongodb => db.users.find({age: {$gt: 21}})
for less than: $lt, for equal: $eq

11. Update
- updateOne : it will update the first document that is found matching the provided query.
e.g: db.users.updateOne({username: 'Aashwasti'}, {$set: {username: 'Aashu'}})

// Update takes two parameters: first is the condition to find that particular document, second is the set parameter, i.e, what we want to update

- insert if not found: If you would like to insert the document if it is not found, you can use the upsert option.

e.g. db.users.updateOne(
  {u_id: 4}, 
  {
    $set: 
      {
        u_id: 4, 
        username: 'Ramesh', 
        age: 25
      }
    }, 
    {upsert: true}
  )

  It will insert the new document. 

- updateMany: It will update all documents that match the provided query.

e.g: db.users.find({}, {$inc: {u_id: 1}})
It will increase all users' u_id by 1

12. Delete
- deleteOne(): will delete the first document that matches the query provided.
e.g: db.users.deleteOne({u_id: 4})  => Delete the first occurence of user having u_id = 4

- deleteMany(); will delete all documents that match the query provided.
e.g: db.users.deleteOne({age: 22})  => Delete all the users whose age is 22
*/

/*
MongoDB compass GUI
- There are lots of tools in the market that help to visualize data like mongoDB compass, mongoDB robo 3T
- use the connection url that you have in mongosh to connect in gui, i.e, mongodb://127.0.0.1:27017
*/

/*
Data Designing and postman
- Now in order to use the db, we have to integrate mongoDB with nodejs
- now, there should be a form built on reactJS or html or css to add chef(database) to person details
- now currently we don't have such a frontend thing, so we are using postman.

- Postman is an API(application programming interface) development tool that helps to build, test and modify APIs.

- Postman ek aisa tool hai, jo ki help krta hai ki frontend kis tarah se data ko banake dega aur kis api pe call krega..
*/

/*
Connect mongoDB with nodeJS

- To connect mongoDB with nodeJS, we need a mongoDB driver (a set of programs.)

- A mongoDB driver is essential when connecting nodejs with mongodb bcz it acts as a bridge b/w your nodejs application and the mongodb database.

- MongoDB speaks its own language (protocol) to interact with the db server.

- nodejs communicates in js

- the driver translates the js code from node.js into a format that mongoDB can understand and vice versa.

- The driver provides a set of functions and methods that make it easier to perform common db operations from your node.js code

- The driver helps you handle errors that might occur during db interactions. It provides error codes, descriptions, and other details to help you troubleshoot issues.

- The most popular driver is the official MongoDB Node.js driver, also known as the mongodb package.

- But we will use mongoose rather than mongodb package, as it is more useful.
*/

/*
Mongoose

- Mongoose is an Object Data Modeling (ODM) library for mongoDB and node.js
- There are lots of reasons we prefer mongoose rather than a native official driver.
- Things are a lot easier here.

- Mongoose is like a translator between your node.js code and mongoDB. It makes working with the db smoother and easier.

- With mongoose, you can define how your data should look, like making a blueprint for your documents. It's like saying, "In our db, each person's information will have a name, age and email". This makes sure your data stays organized.

- Mongoose helps you make sure the data you put into the db is correct. It's like having someone check if you've written your email address correctly before sending a message.

- Very easy to query from the database.
*/

/*
But if you are using mongodb native driver:
- you need to write a lot of detailed instructions to make sure everything works correctly.
- without mongoose, your code might get messy and harder to understand.
- since, you need to handle many detials yourself, it can take longer to finish your project.
*/

// In a nutshell, using mongoose makes working with mongoDB in node.js much simpler and smoother. It gives you tools that handle complexities for you, so you can focus on bulding your application without getting bogged down in technical details.