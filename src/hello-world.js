const express = require('express');

// Create the Express app, and set the port
const app = express();
const port = 3000;

// Create a simple GET endpoint on the home page
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

// Start our client
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}`)
);
