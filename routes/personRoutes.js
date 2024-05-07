/*
Express Router

- We have a lots of Endpoints in a single file server.js
- This makes bad experience in code readability as well as code handling
- Express Router is a way to modularize and organize your route handling code in an Express.js application.
- So let's create a separate file to manage endpoints /person and /menu
- Express Router is like a traffic cop for your web server
- Express Router helps you organize and manage these pages or endpoints in your web application. It's like creating separate folders for different types
of tasks.
- Create a folder routes → personRoutes. js
*/

const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Data saved');
    res.status(200).json(response);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter

    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Update operation

- We will update our person record, for that we will create an endpoint from where we are able to update record.

- For updation, we need 2 things:
  - Which record we want to update ?
  - What exactly we want to update ?

- For update we will use PUT or PATCH method to create an endpoint.

- What is an unique identifier in a document (row) in a collection ?
Ans : It's _id, which is given by mongodb itself, we will use this to find the particular record which we want to update.

- And now we will send the data as same like we did in post method.
*/

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    // Here, the id is the unique identifier for the person. This id is the _id that is provided by mongo db for each document.
    const updatedPersonData = req.body; // Updated data for the person that is sent by client.

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // return the updated document
      runValidators: true, // run mongoose validation for the data, i.e, the type of data to be updated must be same with the data types and constraints defined for the models.
    });

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/*
Delete Operation

- We will delete our person record, for that we will create an endpoint from where we are able to delete record.
- For deletion we need one thing: which record we want to update?
- For delete we will use DELETE method to create an endpoint.
- What is a unique identifier in a document in a collection ? 
- It's _id, which is given by mongodb itself, we will use this to find the particular record which we want to delete.
*/

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID from the url parameter.

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
