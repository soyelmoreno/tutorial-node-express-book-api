/** Opens the book edit modal */
const setEditModal = (isbn) => {
  console.log(`Ready to edit ${isbn}`);
};

/** Deletes a book */
const deleteBook = (isbn) => {
  // code goes here
};

/** Load existing books */
const loadBooks = () => {
  // Create an AJAX object, send a GET request to the books endpoint
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'http://localhost:3000/api/book', false);
  xhttp.send();
  // Parse the response.
  const books = JSON.parse(xhttp.responseText);
  // Grab the books element
  let booksEl = document.getElementById('books');
  // Loop through the books, creating a card for each book
  for (let book of books) {
    const card = `
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">${book.title}</h3>
            <h4 class="card-subtitle mb-2 text-muted">${book.isbn}</h4>

            <div>Author: ${book.author}</div>
            <div>Publisher: ${book.publisher}</div>
            <div>Number of Pages: ${book.numPages}</div>

            <hr>

            <button type="button" class="btn btn-danger">Delete</button>
            <button
              type="button"
              class="btn btn-primary float-right"
              data-toggle="modal"
              data-target="#editBookModal"
              onClick="setEditModal(${book.isbn})">
              Edit
            </button>
          </div>
        </div>
      </div>
    `;
    // Add the newly generated card
    booksEl.innerHTML = booksEl.innerHTML + card;
  }
};

loadBooks();
