const myLibrary = [];

/* Book Data and Methods */

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    this.pages +
    " pages, " +
    (this.read ? "read." : "not read yet.")
  );
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

/* Library Management and Display */

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function updateBookshelf() {
  const bookshelf = document.querySelector("tbody");
  bookshelf.replaceChildren(); // clear existing data

  for (const book of myLibrary) {
    const row = document.createElement("tr");

    // title
    const title = document.createElement("th");
    title.textContent = book.title;
    row.appendChild(title);

    // author
    const author = document.createElement("td");
    author.textContent = book.author;
    row.appendChild(author);

    // pages
    const pages = document.createElement("td");
    pages.textContent = book.pages;
    row.append(pages);

    // read
    const read = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = book.read;
    checkbox.addEventListener("change", () => {
      book.toggleRead();
    });
    read.appendChild(checkbox);
    row.appendChild(read);

    // add book to shelf
    bookshelf.appendChild(row);
  }
}

const newBookButton = document.querySelector("#add-book-button");
const newBookDialog = document.querySelector("#add-book-dialog");
newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

const newBookForm = newBookDialog.querySelector("form");
newBookForm.addEventListener("submit", () => {
  const formData = new FormData(newBookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");
  addBookToLibrary(title, author, pages, read);
  updateBookshelf();
  newBookDialog.close();
});

/* Test Data */

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 420, true);
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1440, true);
addBookToLibrary("Dune", "Frank Herbert", 530, false);
updateBookshelf();
