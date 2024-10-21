console.log("Welcome to the library!");

const myLibrary = [];

function Book(title, author, genre, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.read = read;
}

// Prepopulate the list for testing
const testBook1 = new Book("The Hobbit", "J. R. R. Tolkien", "Fantasy", true);
const testBook2 = new Book("The Odyssey", "Homer", "Mythology", false);
const testBook3 = new Book("Dune", "Frank Herbert", "Science Fiction", false);
myLibrary.push(testBook1);
myLibrary.push(testBook2);
myLibrary.push(testBook3);

const addBookDialog = document.querySelector("#add-book-dialog");
const addBookButton = document.querySelector("#add-book-button");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", () => {
  addBookToLibrary();
});

function addBookToLibrary() {
  const bookForm = document.querySelector("#add-book-form");
  const bookFormData = new FormData(bookForm);

  const bookTitle = bookFormData.get("book-title");
  const bookAuthor = bookFormData.get("book-author");
  const bookGenre = bookFormData.get("book-genre");
  const bookRead = bookFormData.get("book-read") === "on";

  // TODO: is there a better way to validate the form data?
  if (bookTitle === "" || bookAuthor === "" || bookGenre === "") {
    return;
  }

  const newBook = new Book(bookTitle, bookAuthor, bookGenre, bookRead);
  myLibrary.push(newBook);
  displayLibrary();
}

function displayLibrary() {
  const bookList = document.querySelector("#book-list");
  bookList.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookInfoCard = document.createElement("div");
    bookInfoCard.setAttribute("id", `index${i}`);
    bookInfoCard.setAttribute("class", "book-info-card");

    const bookTitle = document.createElement("h2");
    bookTitle.setAttribute("class", "book-title");
    bookTitle.appendChild(document.createTextNode(`${book.title}`));

    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "book-author");
    bookAuthor.appendChild(document.createTextNode(`by ${book.author}`));

    const bookGenre = document.createElement("p");
    bookGenre.setAttribute("class", "book-genre");
    bookGenre.appendChild(document.createTextNode(`${book.genre}`));

    const bookReadLabel = document.createElement("label");
    bookReadLabel.setAttribute("for", `read${i}`);
    bookReadLabel.textContent = "Read?";

    const bookRead = document.createElement("input");
    bookRead.setAttribute("id", `read${i}`);
    bookRead.setAttribute("class", "book-read");
    bookRead.setAttribute("type", "checkbox");
    bookRead.checked = book.read;

    // Allow user to toggle whether or not they've read the book
    bookRead.addEventListener("input", () => {
      book.read = !book.read;
      bookRead.checked = book.read;
    });

    const bookRemove = document.createElement("button");
    bookRemove.setAttribute("class", "remove-book-button");
    bookRemove.textContent = "Remove";

    // Allow users to remove book from list
    bookRemove.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      displayLibrary();
    });

    bookInfoCard.appendChild(bookTitle);
    bookInfoCard.appendChild(bookAuthor);
    bookInfoCard.appendChild(bookGenre);
    bookInfoCard.appendChild(bookReadLabel);
    bookInfoCard.appendChild(bookRead);
    bookInfoCard.appendChild(bookRemove);

    bookList.appendChild(bookInfoCard);
  }
}

displayLibrary();
