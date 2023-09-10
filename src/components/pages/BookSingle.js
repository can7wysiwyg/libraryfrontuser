import axios from "axios"
import moment from "moment/moment"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../GlobalState"

function BookSingle() {
   const {id} = useParams()
  const state = useContext(GlobalState)
  const[authors] = state.authorsApi.authors
  const[singleBook, setSingleBook] = useState({})
   

   useEffect(() => {

    const getBook = async() => {
           const res = await axios.get(`/books/single_book/${id}`)

           setSingleBook(res.data.book)

    }

    getBook()

   }, [id])

   const name = authors.find((author) => author._id === singleBook.bookAuthor)

   if(name === undefined) {
    return(<>
    
    <h2 className="text-center">we are survivors...</h2>
    
    </>)
   }


   if(Object.keys(singleBook).length < 1) {
    return(<>
    <h3 className="text-center">straight outta compton</h3>
    
    </>)
   }

    return(<div className="container">

<div className="row justify-content-center" style={{marginTop: "2rem"}}>
          <div className="col-md-8">
            <div className="card mb-4">
              <img src={singleBook.bookImage} alt={singleBook.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{singleBook.bookTitle}</h5>
                <p className="card-text">released on {moment(singleBook.bookReleaseDate).format("MMM D YYYY")} </p>
                <p className="card-text text-primary"> <a href={`/show_author/${name._id}`} style={{textDecoration: "none"}}> {name.authorName} </a></p>
                <h5 className="text-center"> <a href={`/borrow_book/${singleBook._id}`} style={{textDecoration: "none"}}> BORROW BOOK </a> </h5>
                
                
                
              </div>
            </div>
          </div>
        </div> 

<div>
<h1 style={{fontFamily: "Times New Roman"}}>Related Books</h1>

<RelatedBooks category={singleBook.bookGenre} />

</div>

    
    
    </div>)
}


const RelatedBooks = ({category}) => {
   

    const[results, setResults] = useState([])

    useEffect(() => {
 
     const getBooks = async() => {
 
         const res = await axios.get(`/books/show_according_to_genre/gnr?genre=${category}`)
 
         setResults(res.data.books);
 
     }
 
     getBooks()
 
 
    }, [category])


    let relatedTitles = results.slice(-3)


 

    return(<>
    <div className="row" style={{marginTop: "2rem"}}>
                        {relatedTitles.map((filteredBook) => (
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

                                    <h5 className="text-center"> <a href={`/borrow_book/${filteredBook._id}`} style={{textDecoration: "none"}}> BORROW BOOK </a> </h5>

                                 </div>
                                                        </div>
                           </div>
                        ))}
                     </div>
    

    

    
    </>)
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
    

export default BookSingle