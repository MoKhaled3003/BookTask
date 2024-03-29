const fs = require('fs');

class BookService {
    constructor() {
        this.data = [];
        this.isDataLoaded = false;
    }

    //generate id for new added books based on last id in file
    async getId() {
        let lastBook = this.data[this.data.length - 1]
        if(!lastBook) return 1;
        return lastBook.id+1;
    }

    //update specific book with id and replace it with new data fields
    //and keep same id
    async updateBook(id, newBook) {
        for (let obj of this.data) {
            if (obj.id == id) {
                Object.assign(obj,newBook)
            }
        }
    }

    //add book to the loaded data
    async saveBook(obj) {
        this.data.push(obj)
    }

    //method run on exit of application to persist books to disk
    async saveData() {
        fs.writeFile('books.json', JSON.stringify(this.data), (err) => {
        })
    }
    //method run on application start to store all books in array of objects
    //
    async loadData() {
        if (!this.isDataLoaded) {
            this.data = require('./books.json')
            this.isDataLoaded = true
        }
    }

    //return list of books id,title 
    async viewBooks() {
        let newBooks = this.data.map(book => {
            return {
                id: book.id,
                title: book.title
            }
        })
        if(!newBooks) throw new Error('books not found')
        return newBooks;
    }

    //get specific book object by id from file
    async viewSpecificBook(id) {
        for (let book of this.data) {
            if (book.id === id) {
                return book
            }
        }
        throw Error('book not found')
    }

    //generic find method to search for keyword in whole objects
    async find(keyword) {
        let arr = []
        for (let obj of this.data) {
            if (obj.title.includes(keyword)) {
                arr.push(obj) 
            } else if (obj.author.includes(keyword)) {
                arr.push(obj)
            } else if (obj.description.includes(keyword)) {
                arr.push(obj)
            }
        }
        if(!arr.length) throw new Error('no search result')
        return arr;
    }
}
module.exports = BookService