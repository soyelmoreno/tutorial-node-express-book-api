const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app, and set the port
const app = express();
const port = 3000;

// Where we will keep books
let books = [];

// Tell the app to use CORS middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a POST endpoint
app.post('/book', (req, res) => {
  // code goes here
});

// Start our client
app.listen(port, () => console.log(`Book API listening on port ${port}`));
