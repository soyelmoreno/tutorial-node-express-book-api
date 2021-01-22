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

// Tell the app to serve static files from the /public directory
app.use(express.static('public'));

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
app.post('/api/book', (req, res) => {
  const book = req.body;
  // Output the book being added to the console for debugging
  console.log(book);
  books.push(book);
  res.send('Book was added to the database.');
});

// Create a GET endpoint to retrieve all the books from the API
app.get('/api/book', (req, res) => {
  res.json(books);
});

/*
Here, we're introduced to parametrized URLs. Since the ISBN depends on the book,
there's potentially an infinite number of endpoints here. By adding a colon (:)
to the path, we can define a variable, mapped to the variable isbn. So, if a
user visits localhost:3000/book/5 the isbn parameter will be 5.

You can accept more than one parameter in your URL if it makes sense in your
scenario. For example /image/:width/:height, and then you can get those
parameters using req.params.width and req.params.height.
*/

// Create a GET endpoint with a parameterized URL to retrieve a specific book
app.get('/api/book/:isbn', (req, res) => {
  // Read the ISBN from the URL
  const isbn = req.params.isbn;

  // Search books for this ISBN

  // New way: use find() method
  //const theBook = books.find((book) => book.isbn === isbn);
  //res.json(theBook);

  // The old way: loop through, return when we match
  for (let book of books) {
    if (book.isbn === isbn) {
      res.json(book);
      return;
    }
  }

  // If we get to here, this specific book was not found. Send a 404
  res.status(404).send('Book not found');
});

// Start our client
app.listen(port, () => console.log(`Book API listening on port ${port}...`));
