//DEFINING BOOK OBJECT
function Book(title, author, numPages) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = false;
}
//RETURN A BRIEF INFO OF THE BOOK OBJECT
Book.prototype.info = function () {
    return `The book ${this.title} is a ${this.numPages} page book written by ${this.author}`;
}
//TO TOGGLE READ STATUS OF BOOK OBJECT
Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
}
//TO UPDATE PAGES READ
// Book.prototype.updatePagesRead = function (num) {
//     if (n
// }

//FUNCTIONS
//Detect Local Storage Avaiilability
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
//PUSH BOOK OBJECT INTO MYLIBRARY
function addBookToLibrary(book) {
    myLibrary.push(book);
}
//CREATE TITLE TEXT FROM BOOK OBJECT
function addTitle(book) {
    const Title = document.createElement("h3");
    Title.classList.add("title");
    Title.textContent = book.title;
    return Title;
}
//CREATE AUTHOR TEXT FROM BOOK OBJECT
function addAuthor(book) {
    const Author = document.createElement("div");
    Author.classList.add("author");
    Author.textContent = `By: ${book.author}`;
    return Author;
}
//CREATE PAGE COUNTER FROM BOOK OBJECT
function addPageCount(book) {
    const PageCount = document.createElement("div");
    PageCount.classList.add("page-count");
    const condition = book.isRead ? "Finished" : "Not Finished";
    if (book.isRead) { book.pagesRead = book.numPages }
    PageCount.innerHTML = `Page Count : ${book.numPages}<br>Read Status: ${condition}`;

    return PageCount;
}
//CREATE LINK FROM BOOK OBJECT
function addLink(book) {
    const Link = document.createElement("div");
    Link.classList.add("link");
    const a = document.createElement("a");
    a.setAttribute("href", book.link);
    a.setAttribute("target", "_blank");
    a.textContent = "Go To Book";
    Link.appendChild(a);
    return Link;
}
//CREATE READ & DELETE BTN FOR CARD OF LIBRARY
function addConfigs(book) {
    const res = document.createElement("div")
    res.classList.add("config");
    const delBtn = document.createElement("button")
    delBtn.textContent = "DELETE";
    delBtn.classList.add("del-book-btn");
    const updateBtn = document.createElement("button");
    updateBtn.classList.add("read-status-btn");
    let condition = book.isRead ? "Reset" : "Finished";
    updateBtn.textContent = condition;
    updateBtn.addEventListener("click", () => {
        book.toggleReadStatus();
        updateLibrary();
    })
    res.appendChild(updateBtn);
    res.appendChild(delBtn);
    return res;
}
//CREATE A CARD TO BE APPENDED INTO COLLECTION FROM BOOK OBJECT
function createCard(book) {
    const card = document.createElement("div");
    const title = addTitle(book);
    const author = addAuthor(book);
    const pages = addPageCount(book);
    const link = book.link ? addLink(book) : null;
    const delBtn = addConfigs(book)
    card.classList.add("book");
    card.classList.add("card");
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    if (book.link) { card.append(link); }
    card.appendChild(delBtn)
    return card;
}
//TOGGLES THE OPTIONS BUTTONS
function toggleOptions(status) {
    addBookBtn.style.display = status;
    clearBtn.style.display = status;
}
//RESETS THE FORM AND CLOSES IT
function resetForm() {
    addBookForm.style.display = "none";
    for (let i = 0; i < 4; i++) {
        addBookForm[i].value = "";
    }
}
//UPDATE THE LIBRARY FROM BOOKS ARRAY
function updateLibrary() {
    //removes all child nodes
    while (lib.lastElementChild) {
        lib.removeChild(lib.lastElementChild);
    }
    //creates new nodes
    for (let i = 0; i < myLibrary.length; i++) {
        const thisBook = myLibrary[i];
        const card = createCard(thisBook);
        card.setAttribute("data-index", `${i}`);
        lib.appendChild(card);
    }
    //Updates DELETE Btn
    const delBtns = document.querySelectorAll(".del-book-btn");
    delBtns.forEach(btn => btn.addEventListener("click", (e) => {
        let i = e.target.parentElement.parentElement.getAttribute("data-index");
        console.log(i)
        myLibrary.splice(i, 1);
        updateLibrary();
    }))
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const init = [];
const lib = document.querySelector("#collection");
const addBookForm = document.querySelector("#add-book-form");
const addBookBtn = document.querySelector("#add-book-btn");
const formExitBtn = document.querySelector("#form-exit-btn");
const clearBtn = document.querySelector("#clear-btn")

addBookBtn.addEventListener("click", () => {
    addBookForm.style.display = addBookForm.style.display == "block" ? "none" : "block";
    toggleOptions("none");
})
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const [title, author, pages] = [e.target[0].value, e.target[1].value, e.target[2].value]
    const newBook = new Book(title, author, pages);
    newBook.link = e.target[3].value ? e.target[3].value : null;
    myLibrary.push(newBook);
    resetForm();
    toggleOptions();
    updateLibrary();
})
formExitBtn.addEventListener("click", () => {
    resetForm();
    toggleOptions("inline-block");
})
clearBtn.addEventListener("click", () => { localStorage.clear(); myLibrary.splice(0, myLibrary.length); updateLibrary() })


if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('myLibrary')) {
        localStorage.setItem("myLibrary", JSON.stringify(init))
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary.forEach(e => {
            Object.setPrototypeOf(e, Book.prototype)
        })
    }
}
else {
    myLibrary = [];
}

updateLibrary();

