function Book(title, author, pages, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

let library = [];

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    library.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookshelf = document.querySelector(".bookshelf");
    bookshelf.innerHTML = "";
    library.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer");

        bookCard.appendChild(infoContainer);

        const title = document.createElement("h3");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const readStatus = document.createElement("p");
        readStatus.textContent = `Read: ${book.readStatus}`;

        infoContainer.appendChild(title);
        infoContainer.appendChild(author);
        infoContainer.appendChild(pages);
        infoContainer.appendChild(readStatus);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";
        removeButton.classList.add("removeButton");
        removeButton.addEventListener("click", () => {
            removeBook(book.id);
        });

        const readStatusButton = document.createElement("button");
        readStatusButton.textContent = "Change Read Status";
        readStatusButton.classList.add("readStatusButton");
        readStatusButton.addEventListener("click", () => {
            const targetBook = library.find(b => b.id === book.id);
            targetBook.toggleReadStatus();
            displayBooks();
        });

        bookCard.appendChild(buttonContainer);

        buttonContainer.appendChild(readStatusButton);

        buttonContainer.appendChild(removeButton);

        bookshelf.appendChild(bookCard);
    });

}

function removeBook(bookId) {
    library = library.filter(book => book.id !== bookId);
    displayBooks();
}

const addBookForm = document.querySelector(".addBookForm");

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#bookTitle").value;
    const author = document.querySelector("#bookAuthor").value;
    const pages = document.querySelector("#bookPages").value;
    const readStatus = document.querySelector("#readStatus").checked ? "Yes" : "No";

    addBookToLibrary(title, author, pages, readStatus);

    document.querySelector("#bookForm").reset();
});

Book.prototype.toggleReadStatus = function() {
    this.readStatus = this.readStatus === "Yes" ? "No" : "Yes";
}