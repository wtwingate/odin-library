console.log("Welcome to the library!");

const myLibrary = [];

function Book(title, author, genre, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here...
}

function displayLibrary() {
  const bookList = document.querySelector("#book-list");
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookInfoCard = document.createElement("div");
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

    const bookRead = document.createElement("input");
    bookRead.setAttribute("class", "book-read");
    bookRead.setAttribute("type", "checkbox");
    bookRead.checked = book.read;

    // Allow user to toggle whether or not they've read the book
    bookRead.addEventListener("input", () => {
      book.read = !book.read;
      bookRead.checked = book.read;
    });

    bookInfoCard.appendChild(bookTitle);
    bookInfoCard.appendChild(bookAuthor);
    bookInfoCard.appendChild(bookGenre);
    bookInfoCard.appendChild(bookRead);

    bookList.appendChild(bookInfoCard);
  }
}

const testBook1 = new Book("The Hobbit", "J. R. R. Tolkien", "Fantasy", true);
const testBook2 = new Book("The Odyssey", "Homer", "Mythology", false);
const testBook3 = new Book("Dune", "Frank Herbert", "Science Fiction", false);

myLibrary.push(testBook1);
myLibrary.push(testBook2);
myLibrary.push(testBook3);

displayLibrary();
