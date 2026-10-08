const { authors } = require('../models/authorModel.js')


function getAuthors(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(authors))
}

function getUniqAuthor(req, res, id) {
    res.setHeader('Content-Type', 'application/json')
    const author = authors.find(author => author.id === Number(id))
    if (!book) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'The author does not exist' }))
    }
    res.end(JSON.stringify(author))
}

module.exports = {
getAuthors
}