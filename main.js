let myLibrary = [];

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const book1 = new Book("Book 1", "Manusia", 10, true);
const book2 = new Book("Book 2", "Human", 20, false);
const book3 = new Book("Book 3", "An-Nas", 40, true);

[book1, book2, book3].forEach((book) => addBookToLibrary(book));

console.log(myLibrary);
