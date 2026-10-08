const { books } = require('../models/bookModel.js')

function getBooks(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(books))
}

function getUniqBook(req, res, id) {
    res.setHeader('Content-Type', 'application/json')
    const book = books.find(book => book.id === Number(id))
    if (!book) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'The book does not exist' }))
    }
    res.end(JSON.stringify(book))
}

function addBook(req, res) {
    const { title, genre, year } = req.body;

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        authorId: books.length ? books[books.length - 1].authorId + 1 : 1,
        genre,
        year
    };

    books.push(newBook);

    res.status(201).json(newBook);
}

function patchBook(req, res, id) {
    res.setHeader('Content-Type', 'application/json')
    const { title, genre, year } = req.body
    const book = books.find(book => book.id === Number(id))

    if (!book) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'The book does not exist' }))
    } else {
        const newBook = {
            title,
            genre,
            year
        }

        const updatedBooks = books.map(book => {
            if (book.id === Number(id)) {
                return newBook
            }
            return book
        })

        return res.end(JSON.stringify(newBook))
    }

}

module.exports = {
    getBooks,
    getUniqBook,
    addBook,
    patchBook
}