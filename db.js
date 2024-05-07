const mongoose = require('mongoose');
require('dotenv').config(); 

// // Define the mongoDB connection url
// const mongoUrl = process.env.MONGODB_URL_LOCAL;
const mongoUrl = process.env.MONGODB_URL;

// Set up mongodb connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the monogDB connection.
// We will now use this db variable to setup connection between nodejs server and mongodb server.
const db = mongoose.connection;

// Define event listeners for database connection.
db.on('connected', () => {
  console.log('Connected to mongoDB server.');
});

// db.once('open', () => {
//   console.log('Connected to mongoDB');
// });

db.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
