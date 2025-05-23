require('dotenv').config();
const express = require('express');

// Create the Express app, and set the port
const app = express();
const port = process.env.PORT;

// Create a simple GET endpoint on the home page
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

// Start our client
app
  .listen(port, () => console.log(`Hello world app listening on port ${port}`))
  .on('error', function (err) {
    console.log(err);
  });
