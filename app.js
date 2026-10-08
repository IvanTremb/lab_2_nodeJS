// const http = require('http')
// const express = require('express')
// const app = express()
// app.use(express.json());


// const { authors } = require('./models/authorModel.js')
// const { books } = require('./models/bookModel.js')
// const { getBooks, getUniqBook } = require('./controllers/bookController.js');


// const server = http.createServer((req, res) => {
//     const matchBookId = req.url.match(/^\/books\/(\d+)$/)

//     if (req.method === 'GET' && req.url === '/books') {
//         return getBooks(req, res)
//     }
//     else if (req.method === 'GET' && matchBookId) {
//         return getUniqBook(req, res, matchBookId[1])
//     }
//     else {
//         res.end('Hello from Node.js server!')
//     }
// })

// server.listen(3000, () => {
//     console.log('Server is running at http://localhost:3000');
// })

const express = require('express');
const app = express();

app.use(express.json());

const { authors } = require('./models/authorModel.js')
const { books } = require('./models/bookModel.js')
const { getAuthors } = require('./controllers/authorController.js')
const { getBooks, getUniqBook, addBook, patchBook } = require('./controllers/bookController.js')


app.get('/books', (req, res) => {
    getBooks(req, res); 
});

app.get('/books/:id', (req, res) => {
    getUniqBook(req, res, req.params.id); 
});

app.post('/books', (req, res) => {
    addBook(req, res)
});

// app.patch('books', (req, res) =>  {
//     patchBook(req, res)
// }
// )

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    const updatedBook = {
        id: Number(id),
        ...req.body
    };
    books[index] = updatedBook;

    res.json(updatedBook);
})

app.get('/authors', (req, res) => {
    getAuthors(req, res); 
});

app.get('/authors/:id', (req, res) => {
    getUniqBook(req, res, req.params.id); 
});

app.get('/authors/:id/books', (req, res) => {
    const { id } = req.params;
    const authorExists = authors.some(author => author.id === Number(id));
    if (!authorExists) {
        return res.status(404).json({ error: 'Автор не найден' });
    }

    const authorBooks = books.filter(book => book.authorId === Number(id));

    res.json(authorBooks);
});

app.use((req, res) => {
    res.statusCode = 404
    res.send('somthing went wrong');
});


app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});