/*
Database connection

=> Connect mongoDB with node.js

- Create a file db.js in the root folder
- The db.js file you've created in essentially responsible for establishing a connection between your node.js application and your mongodb database using the mongoose library.

--> Connection step by step
1. Import mongoDB and define the mongoDB url: In the db.js file, you first import the mongoose library, and define the url to your mongoDB database. The url typically follows the format: 

mongodb://<hostname>:<port>/<databaseName>

In your code, you've set the url to "mongodb://localhost:27017/mydatabase", where mydatabase is the name of your mongoDB database.

2. Set up the mongoDB connection: Next, you call mongoose.connect() to establish a connectoin to the mongoDB database using the url and some configuration options (useNewUrlParser, useUnifiedTopology, etc.). This step initializes the connection process but does not actually connect at this point.

3. Access the default connection object: Mongoose maintains a default connection object representing the mongodb connection. You retrieve this object using mongoose.connection, and you've stored it in the variable 'db'. This object is what you'll use to handle events and interact with the database.

4. Define event listeners: You define event listeners for the database connection using methods like .on('connected', ...), .on('error', ...) and .on('disconnected', ...).
These event listeners allows you to react to different states of the database connection.

5. Start listening for events: The code is set up to listen for events. When you call mongoose.connect(), mongoose starts the connection process. If the connection is successful, the 'connected' event is triggered, and you log a message indicating that you're connected to mongoDB. If there's an error during the connection process, the 'error' event is triggered, and you log an error message. Similarily, the 'disconnected' event can be useful for handling situations where the connection is lost.

6. Export the database connection: Finally, you export the db object, which represents the mongoDB connection, so that you can import and use it in other parts of your node.js application.

To sum up, db.js file acts as a central module that manages the connection to your mongoDB database using mongoose. It sets up connection, handles connection events, and exports the connection object so that your express.js server (or other parts of your application) can use it to interact with the database. When your server runs, it typically requires or imports this db.js file to establish the database connection before handling HTTP requests.
*/

/*
What are models or schema ?
- Models are like a blueprint of our database.
- It's a representation of a specific collection in mongoDB, like a person.
- Once you have defined a model, you can create, read, update and delete documents in the corresponding mongoDB collection.
- Mongoose allows you to define a schema for your documents. A schema is like a blueprint that defines the structure and data types of your documents within a collection.
*/

/*
What is body-parser

- bodyParser is a middleware library for express.js

- It is used to parse and extract the body of incoming HTTP requests.

- When a client (e.g, a web browser or a mobile app) sends data to a server, it typically includes that data in the body of a HTTP request.

- This data can be in various formats, such as JSON, form data or url-encoded data. bodyParser helps parse and extract this data from the request so that you can work with it in your express.js application.

- bodyParser processess the request body before it reaches your route handlers, making the parsed data available in the req.body for further processing.

- bodyParser.json() automatically parses the JSON data from the request body and converts it into a JS object, which is then stored in the req.body

- Express.js uses lots of middleware and to use middleware we use the app.use() function

e.g. const bodyParser = require('body-parser');
app.use(bodyParser.json());
*/

/*
Send data from client to server

- We need an endpoint where the client sends data and data needs to be saved in the database.

- We need a method called POST

- If we send random values other the schema defined, the mongoose will not save random values.
*/

/*
CRUD operations

     DB operations     HTTP operations
C   -   Create             POST
R   -   Read               GET
U   -   Update             PUT/PATCH
D   -   Delete             DELETE
*/

/*
Parametirised API calls

- We have 3 types of persons - chef, waiter and manager
- Now, if someone told you to give a list of people who are only waiters
- Then we can create an endpoint like this:
  - /person/chef
  - /person/waiter
  - /person/manager

- But this is not the correct method to create as many functions, here we can use parametirised endpoints.

- It can be dynamically inserted into the URL when making a request to the API.

like this: localhost:3000/person/:work
as all these person types are stored inside an array "work".
*/