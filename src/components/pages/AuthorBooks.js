import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./hover.css"
import moment from "moment/moment";
import { GlobalState } from "../GlobalState";
import FirstCheck from "./FirstCheck";

function AuthorBooks() {
    const{id} = useParams()
   const state = useContext(GlobalState)
   const[authors] = state.authorsApi.authors
   const[results, setResults] = useState([])
   const[isLogged] = state.userApi.isLogged
  
   const[clientNum] = state.userApi.clientNum
 



   useEffect(() => {

     if( isLogged === true && clientNum !== 1) {
       return(<>
       
       {window.location.href = "/submit_report"}
       
       </>)
     }
     


   }, [clientNum, isLogged])


   useEffect(() => {

    const getBooks = async() => {

        const res = await axios.get(`/books/show_author_books/${id}`)

        setResults(res.data.books)

    }

    getBooks()

   }, [id])

   let name = authors?.find((author) => author._id === id)

   if(name === undefined) {
    return(<>
    
    <h3 className="text-center">night shift</h3>
    
    </>)
   }

   if(results.length === 0) {
    return(<>
    
    <h2 className="text-center">books are loading</h2>
    
    </>)
   }
    return(<div className="container">

        <div style={{marginTop: "2rem", marginBottom: "2rem", fontFamily: "cursive", fontWeight: "bolder", textAlign: "center"}}>
             <p>books by {name.authorName}</p>
          
        </div>

        <div className="row" style={{marginTop: "2rem"}}>

        {results.map((filteredBook) => (
                           <div key={filteredBook._id} className="col-md-4 mb-4">
                              <div className="card cont h-100 shadow-sm">
                                 <img src={filteredBook.bookImage} 
                                 alt={filteredBook.bookTitle} 
                                 className="card-img-top"style={{width: "100%", maxHeight: "30vh",objectFit: "contain"}}
                                 />
                                  <div className="card-body">
                                 <h3><a href={`/single_book/${filteredBook._id}`} style={{textDecoration: "none", fontWeight: "bold"}}>{filteredBook.bookTitle}</a></h3>
                                  <h4>
                                    released on <span style={{color: "red"}}>{ moment(filteredBook.bookReleaseDate).format("MMM D YYYY")}</span>
                                    
                                    </h4> 

                                    <FirstCheck filteredBook={filteredBook} />

                                    
                                 </div>
                                                        </div>
                           </div>
                        ))}



        </div>

    
    
    </div>)
}

export default AuthorBooks