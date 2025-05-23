/** Opens the book edit modal */
const setEditModal = (isbn) => {
  // Create an AJAX object, send a GET request to the book endpoint
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', `/api/books/${isbn}`, false);
  xhttp.send();
  // Parse the response
  const book = JSON.parse(xhttp.responseText);

  // Grab variables from the book
  const { title, author, publisher, pubdate, numpages } = book;

  // Fill in information about the book in the form inside the modal
  document.getElementById('isbn').value = isbn;
  document.getElementById('title').value = title;
  document.getElementById('author').value = author;
  document.getElementById('publisher').value = publisher;
  document.getElementById('pubDate').value = pubdate;
  document.getElementById('numPages').value = numpages;

  // Set up the action url for the book
  document.getElementById('editForm').action = `/api/books/${isbn}`;
};

/** Deletes a book */
function deleteBook(isbn) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', `/api/books/${isbn}`, false);
  xhttp.send();

  // Reloading the page
  location.reload();
}

/** Load existing books */
function loadBooks() {
  // Create an AJAX object, send a GET request to the book endpoint
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', `/api/books`, false);
  xhttp.send();
  // Parse the response
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
            <div>Number of Pages: ${book.numpages}</div>

            <hr>

            <button
              type="button"
              class="btn btn-danger"
              onClick="deleteBook(${book.isbn})">
              Delete
            </button>
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
}

loadBooks();
