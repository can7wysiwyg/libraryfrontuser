import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../GlobalState"
import FirstCheck from "./FirstCheck"

function BooksByGenre() {
   const {id} = useParams()
  const state = useContext(GlobalState)
  const[genres] = state.genresApi.genres
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

        const res = await axios.get(`/books/show_according_to_genre/gnr?genre=${id}`)

        setResults(res.data.books);

    }

    getBooks()


   }, [id])

let genreDesc = genres.find((genre) => genre._id === id)

if(genreDesc === undefined) {
    return(<>
    <h3 className="text-center">life is full of ups and downs</h3>
    
    </>)
}

if(results.length === 0) {
    return(<>
    <h3 className="text-center">Autumn leaves</h3>
    
    </>)
}

    return(<div className="container">

        <div style={{textAlign: "center", marginTop: "2rem", marginBottom: "2rem"}}>
            <h3>
                books under the genre of {genreDesc.genreName}
            </h3>
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
                                    <AuthorNames name ={filteredBook.bookAuthor} />
                                    
                                    </h4> 

                                    <FirstCheck filteredBook={filteredBook} />

                                   
                                 </div>
                                                        </div>
                           </div>
                        ))}
                     </div>
    
    
    </div>)
}


const AuthorNames = ({name}) => {
    const state = useContext(GlobalState)
    const[authors] = state.authorsApi.authors
    const[displayName, setDisplayName] = useState({})
    
    useEffect(() => {
    
       if(name) {
          authors?.forEach(author => {
            if(author._id === name) setDisplayName(author)
             
          });
       }
    
    
    }, [name, authors]) 
    
       return(<>
    
       <a href={`/show_author/${displayName._id}`} style={{textDecoration: "none"}}> {displayName.authorName} </a>
       
       
       </>)
    }
    

export default BooksByGenre