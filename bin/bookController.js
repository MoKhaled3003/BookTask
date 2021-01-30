const Book = require("./book");
const BookService = require("./BookService");

class BookController {
    constructor(service){
        this.service = service
        this.books=[];
    }
    async createBook(title,author,description){
        let id = await this.service.getId() + 1;
        console.log('after increment id',id)
        let book = new Book(id,title,author,description)
        await this.service.saveBook(book)
    }
    async OnApllicationStart(){
        await this.service.loadData()
    }
    async OnApllicationExit(){
        await this.service.saveData()
    }
     async getBooks(){
        let books = await this.service.viewBooks()
        console.log(books)
        return books
    }
    async getSpecificBook(id){
        let book = this.service.viewSpecificBook(id)
        console.log(book)
        return book;
    }
    async updateBook(id,newBook){
        this.service.update(id,newBook)
    }

    async search(keyword){
        let book = await this.service.find(keyword)
        console.log(book)
    }

}

async function main(){
//BookController.createBook('mo',"ali","uhsidiausd");
//BookController.getBooks();
let bc = new BookController(new BookService())
await bc.OnApllicationStart()
bc.getBooks();
// bc.updateBook(10,{
//     title:"oskokok",
//     author:"kokoko",
//     description:"momomomo"
// })
//bc.search('dwdwd')
await bc.createBook("momoh","usususus","isjdoiasdjo")
await bc.createBook("momoh","usususus","isjdoiasdjo")
await bc.createBook("momoh","usususus","isjdoiasdjo")
await bc.createBook("momoh","usususus","isjdoiasdjo")


bc.getBooks();
bc.OnApllicationExit()
}
main()