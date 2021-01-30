const fs = require('fs');

class BookService {
    constructor() {
        this.data = [];
        this.isExcuted = false;
    }
    async getId() {
        let lastBook = this.data[this.data.length - 1]
        return lastBook.id;
    }

    async find(keyword) {
        let arr = []
        //search in each obj for the keyword in title authur desc
        for (let obj of this.data) {
            if (obj.title.includes(keyword)) {
                arr.push(obj)
            } else if (obj.author.includes(keyword)) {
                arr.push(obj)
            } else if (obj.description.includes(keyword)) {
                arr.push(obj)
            }
        }
        return arr;
    }

    async update(id,newBook){
        for(let obj of this.data){
            if(obj.id == id){
                Object.keys(obj).forEach(function(key) {
                    if(key !='id') obj[key] = newBook[key];
                  }) 
            }
        }
    }

    async saveBook(obj) {
      this.data.push({
          id:obj.id,
          title:obj.title,
          author:obj.author,
          description:obj.description
      })
     // console.log('databeforesave',this.data)
    }

    async saveData(){
        console.log('2 databeforesave',this.data)
        fs.writeFile('books.json',JSON.stringify(this.data),(err)=>{
            console.log(err)
        })
    }
    async viewBooks() {
        let newBooks = this.data.map(book => {
            return {
                id: book.id,
                title: book.title
            }
        })
        return newBooks;
    }
    
    async loadData() {
        if (!this.isExcuted) {
            this.data = await require('./books.json')
        }
    }

    async viewSpecificBook(id) {
        let isFound = false;
        for (let book of this.data) {
            if (book.id === id) {
                isFound = true;
                return book
            }
        }
        if (!isFound) {
            throw Error('book not found')
        }
    }

}
module.exports = BookService