require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app, and set the port
const app = express();
const port = process.env.PORT;

// Where we will keep books, simulating a database
let books = [
  {
    isbn: '234234',
    title: 'Wow it is a book',
    author: 'Carlos Moreno',
    pubdate: '2/25/2004',
    publisher: 'Carlos Industries',
    numpages: '345'
  },
  {
    isbn: '992888999',
    title: 'Getting the most out of life',
    author: 'Bucky Bananas',
    pubdate: '9/18/1978',
    publisher: 'Amazing pubs',
    numpages: '98'
  }
];

// Function to find the book with the given id in the array of books
function getBook(isbn) {
  return books.find((b) => b.isbn === isbn);
}

// Tell the app to use CORS middleware
app.use(cors());

// Tell the app to serve static files from the /public directory
app.use(express.static('public'));

// We can configure body-parser by passing it to the app.use() method, which
// enables it as middleware to the Express app instance.

// Configuring body parser middleware by passing it to the app.use method, which
// enables it as middleware to the Express app instance.
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

// Create a POST endpoint to add a new book to the books array
app.post('/api/book', (req, res) => {
  const newBook = req.body;
  // We can output the book being added to the console for debugging
  // console.log(newBook);
  books.push(newBook);
  res.send('Book was added to the database.');
});

// Create a GET endpoint to retrieve all the books from the API
app.get('/api/book', (req, res) => {
  res.json(books);
});

/*
Here, we're introduced to parameterized URLs. Since the ISBN depends on the
book, there's potentially an infinite number of endpoints here. By adding a
colon (:) to the path, we can define a variable, mapped to the variable isbn.
So, if a user visits localhost:3000/book/5 the isbn parameter will be 5.

You can accept more than one parameter in your URL if it makes sense in your
scenario. For example /image/:width/:height, and then you can get those
parameters using req.params.width and req.params.height.
*/

// Create a GET endpoint with a parameterized URL to retrieve a specific book
app.get('/api/book/:isbn', (req, res) => {
  // Read the ISBN from the URL
  const isbn = req.params.isbn;

  // Search books for this specific book
  const book = getBook(isbn);

  // If book doesn't exist, respond with a 404
  if (!book) {
    res.status(404);
    res.send('Book not found');
    return;
  }

  // If we get here, this specific book exists. Respond with it
  res.json(book);
});

// Create a DELETE endpoint to delete a specific book
app.delete('/api/book/:isbn', (req, res) => {
  // Read the ISBN from the URL
  const isbn = req.params.isbn;

  // Find the specific book
  const book = getBook(isbn);

  // If book doesn't exist, respond with a 404
  if (!book) {
    res.status(404);
    res.send('Book not found');
    return;
  }

  // Book exists. Remove it from the books array
  books = books.filter((b) => {
    if (b.isbn !== isbn) {
      return true;
    }
    return false;
  });

  // Respond with a message that the book was deleted
  res.send('Book is deleted');
});

// Create a POST endpoint for updating a specific book
app.post('/api/book/:isbn', (req, res) => {
  // Read the ISBN from the URL
  const isbn = req.params.isbn;
  const newBook = req.body;

  // Find the specific existing book
  const book = getBook(isbn);
  if (!book) {
    res.status(404);
    res.end();
    return;
  }
  // The desired book exists. Find the index of the book
  const i = books.findIndex((b) => b.isbn === isbn);
  // Replace the old book with the new book
  books[i] = newBook;

  // Respond with a message
  res.send('Book is edited');
});

// Start our client
app.listen(port, () => console.log(`Book API listening on port ${port}...`));
