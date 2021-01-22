const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app, and set the port
const app = express();
const port = 3000;

// Where we will keep books, simulating a database
let books = [];

// Tell the app to use CORS middleware
app.use(cors());

// We can configure body-parser by passing it to the app.use() method, which
// enables it as middleware to the Express app instance.

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
There are a few types of HTTP request body types. For an example,
application/x-www-form-urlencoded is the default body type for forms, whereas
application/json is something we'd use when requesting a resource using jQuery
or backend REST client.

What the body-parser middleware will be doing is grabbing the HTTP body,
decoding the information, and appending it to the req.body. From there, we can
easily retrieve the information from the form - in our case, a book's
information.
*/

// Create a POST endpoint to add the book to the books array
app.post('/book', (req, res) => {
  const book = req.body;
  // Output the book being added to the console for debugging
  console.log(book);
  books.push(book);
  res.send('Book was added to the database.');
});

// Start our client
app.listen(port, () => console.log(`Book API listening on port ${port}`));
