import axios from "axios"
import { useEffect, useState } from "react"

function BooksApi() {
   const[books, setBooks] = useState([])

   useEffect(() => {

    const getBooks = async() => {
       
        const res = await axios.get('/books/show_all')
        setBooks(res.data.books)

    }

    getBooks()

   }, [])
    return{

        books: [books, setBooks]

    }
}

export default BooksApi