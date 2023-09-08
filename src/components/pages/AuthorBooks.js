import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function AuthorBooks() {
    const{id} = useParams()
   const[results, setResults] = useState([])

   useEffect(() => {

    const getBooks = async() => {

        const res = await axios.get(`/books/show_author_books/${id}`)

        setResults(res.data.books)

    }

    getBooks()

   }, [id])

console.log(results);
    return(<>
    
    
    </>)
}

export default AuthorBooks