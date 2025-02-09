const myLibrary = [];

/* Book Class */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      (this.read ? "read." : "not read yet.")
    );
  }

  toggleRead() {
    this.read = !this.read;
  }
}

/* Library Management and Display */

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function updateBookshelf() {
  const bookshelf = document.querySelector("tbody");
  bookshelf.replaceChildren(); // clear existing data

  for (const [index, book] of myLibrary.entries()) {
    const row = document.createElement("tr");
    row.dataset.index = index;

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

    // remove
    const remove = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      updateBookshelf();
    });
    remove.appendChild(removeButton);
    row.appendChild(remove);

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
