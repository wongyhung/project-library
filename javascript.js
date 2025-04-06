function Book(title, author, pages, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const library = [];

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    library.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookshelf = document.getElementById(".bookshelf");
    bookshelf.innerHTML = "";
    library.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const readStatus = document.createElement("p");
        readStatus.textContent = `Read: ${book.readStatus}`;

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatus);
        
        const removeButton = bookCard.querySelector(".removeButton");
        removeButton.addEventListener("click", () => {
            removeBook(book.id);
        });

        bookshelf.appendChild(bookCard);
    });

}

function removeBook(bookId) {
    library = library.filter(book => book.id !== bookId);
    displayBooks();
}

const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#bookTitle").value;
    const author = document.querySelector("#bookAuthor").value;
    const pages = document.querySelector("#bookPages").value;
    const readStatus = document.querySelector("#readStatus").value;

    addBookToLibrary(title, author, pages, readStatus);

    document.querySelector("#bookForm").reset();
});
