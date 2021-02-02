const Book = require("./book");
const BookService = require("./BookService");

class BookController {
    //injecting BookService to Controller
    constructor(service) {
        this.service = service
        this.books = [];
    }

    //method to load all books when application starts
    //if you tried to provide empty books.json it won't crash
    async OnApllicationStart() {
        try {
            await this.service.loadData()
        } catch (err) {
            console.log('invalid empty array of objects in books.json')
        }
    }

    //method to save all books when application exits
    async OnApllicationExit() {
        try {
            await this.service.saveData()
        } catch (err) {
            console.log('error in saving file')
        }
    }

    //create book method to handle service calls and return responces
    async createBook(title, author, description) {
        try {
            let id = await this.service.getId();
            console.log('after increment id', id)
            let book = new Book(id, title, author, description)
            await this.service.saveBook(book)
        } catch (err) {
            console.log('error in saving book')
        }

    }

    //get all books in service and handle responce
    async getBooks() {
        try {
            let books = await this.service.viewBooks()
            return books
        } catch (err) {
            console.log(err.message)
        }
    }

    //get specific book and handle responce
    async getSpecificBook(id) {
        try {
            let book = await this.service.viewSpecificBook(id)
            return book;
        } catch (err) {
            console.log(err.message)
        }

    }

    //update book if exists
    async updateBook(id, newBook) {
        try {
            //first find if book exists then update
            await this.getSpecificBook(id)
            this.service.updateBook(id, newBook)
        } catch (err) {
            console.log(err.message)
        }
    }

    //return all books that contains the keyword
    async search(keyword) {
        try {
            let book = await this.service.find(keyword)
            return book
        } catch (err) {
            console.log(err.message)
        }
    }

}

module.exports = BookController

// async function main() {
//     //BookController.createBook('mo',"ali","uhsidiausd");
//     //BookController.getBooks();
//     let bc = new BookController(new BookService())
//     await bc.OnApllicationStart()
//     bc.getBooks();
//     // bc.updateBook(30, {
//     //     title: "oskokok",
//     //     author: "kokoko",
//     //     description: "momomomo"
//     // })
//     //bc.search('dwdwd')
//     // await bc.createBook("momoh", "usususus", "isjdoiasdjo")
//     // await bc.createBook("momoh", "usususus", "isjdoiasdjo")
//     // await bc.createBook("momoh", "usususus", "isjdoiasdjo")
//     // await bc.createBook("momoh", "usususus", "isjdoiasdjo")
//     // await bc.getSpecificBook(30)

//     bc.getBooks();
//     bc.OnApllicationExit()
// }
// main()