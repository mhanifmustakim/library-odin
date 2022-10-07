const libraryContainer = document.querySelector("#library-container");
let myLibrary = [];

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

Book.prototype.createNode = function () {
    const bookNode = document.createElement("div");
    const bookTitle = document.createElement("header");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookStatus = document.createElement("p");

    bookNode.classList.add("book");
    bookTitle.classList.add("book-title");
    bookTitle.innerText = this.title;
    bookAuthor.appendChild(createBookInfo("author", this.author));
    bookPages.appendChild(createBookInfo("pages", this.numPages));
    bookStatus.appendChild(createBookInfo("status", this.isRead));

    [bookTitle, bookAuthor, bookPages, bookStatus].forEach(
        (attr) => bookNode.appendChild(attr)
    );

    return bookNode;
}

function createBookInfo(key, value) {
    const node = document.createElement("p");
    const span = document.createElement("span");
    const text = document.createTextNode(`: ${value}`);
    node.classList.add(`book-${key}`)
    switch (key) {
        case "author":
            span.innerText = "Written by"
            break
        case "pages":
            span.innerText = "No. pages"
            break
        case "status":
            span.innerText = "Status"
    }

    node.appendChild(span);
    node.appendChild(text);
    return node;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function clearLibraryDisplay() {
    libraryContainer.innerHTML = "";
}

function displayLibrary() {
    clearLibraryDisplay();
    myLibrary.forEach((book, index) => {
        const bookNode = book.createNode();
        bookNode.setAttribute("data-index", index);
        libraryContainer.appendChild(bookNode);
    })
}

const book1 = new Book("Book 1", "Manusia", 10, true);
const book2 = new Book("Book 2", "Human", 20, false);
const book3 = new Book("Book 3", "An-Nas", 40, true);

[book1, book2, book3].forEach((book) => addBookToLibrary(book));

console.log(myLibrary);
displayLibrary();