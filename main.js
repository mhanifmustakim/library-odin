const libraryContainer = document.querySelector("#library-container");
const createBtn = document.querySelector("#create-btn");
const createBookForm = document.querySelector("#create-book-form");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
let myLibrary = [];

function clearForm() {
    const inputs = createBookForm.querySelectorAll("input");
    inputs.forEach((input) => {
        if (input.getAttribute("type") == "checkbox") {
            input.checked = false;
        } else {
            input.value = "";
        }
    });
    createBookForm.hidden = true;
    createBtn.hidden = false;
}

[cancelBtn, createBtn].forEach(
    (btn) => btn.addEventListener("click", () => {
        createBookForm.hidden = createBookForm.hidden ? false : true;
        createBtn.hidden = createBtn.hidden ? false : true;
        if (createBookForm.hidden === false) createBookForm.scrollIntoView();
        else clearForm();
    })
)

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
    const changeStatusBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    bookNode.classList.add("book");
    bookTitle.classList.add("book-title");
    bookTitle.innerText = this.title;
    bookAuthor.appendChild(createBookInfo("author", this.author));
    bookPages.appendChild(createBookInfo("pages", this.numPages));
    bookStatus.appendChild(createBookInfo("status", this.isRead));
    changeStatusBtn.innerText = `Mark as ${this.isRead ? "Not Finished" : "Finished"}`;
    changeStatusBtn.classList.add("change-status-btn");
    deleteBtn.classList.add("book-delete-btn");

    [bookTitle, bookAuthor, bookPages, bookStatus, changeStatusBtn, deleteBtn].forEach(
        (attr) => bookNode.appendChild(attr)
    );

    return bookNode;
}

Book.prototype.toggleRead = function () {
    this.isRead = this.isRead ? false : true;
}

createBookForm.addEventListener("submit", (e) => {
    const inputs = createBookForm.querySelectorAll("input");
    const submitted = {};

    inputs.forEach((input) => {
        if (input.getAttribute("type") == "checkbox") {
            submitted.isRead = input.checked ? true : false;
        } else {
            submitted[input.name] = input.value;
        }
    });

    const thisBook = new Book(submitted.title, submitted.author, submitted.numPages, submitted.isRead);
    addBookToLibrary(thisBook);
    displayLibrary();
    clearForm();
})

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
            text.textContent = value === true ? ": Finished" : ": Not Finished";
    }

    node.appendChild(span);
    node.appendChild(text);
    return node;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeFromLibrary(index) {
    myLibrary.splice(index, 1);
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

    libraryContainer.querySelectorAll(".book-delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const thisBook = e.target.parentElement;
            const index = thisBook.getAttribute("data-index");
            removeFromLibrary(index);
            displayLibrary();
        })
    })

    libraryContainer.querySelectorAll(".change-status-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const thisBook = e.target.parentElement;
            const index = thisBook.getAttribute("data-index");
            myLibrary[index].toggleRead();
            displayLibrary();
        })
    })
}

const book1 = new Book("Book 1", "Manusia", 10, true);
const book2 = new Book("Book 2", "Human", 20, false);
const book3 = new Book("Book 3", "An-Nas", 40, true);

[book1, book2, book3].forEach((book) => addBookToLibrary(book));

displayLibrary();