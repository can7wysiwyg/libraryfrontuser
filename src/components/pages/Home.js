import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import "./hover.css"

function Home() {
   const state = useContext(GlobalState);
   const [books] = state.booksApi.books;
   const [genres] = state.genresApi.genres;

   if (books.length === 0) {
      return (
         <>
            <h1 className="text-center">Books are loading</h1>
         </>
      );
   }

   return (
      <div className="container">
            {genres?.map((genre) => {
               const genreBooks = books.filter((book) => book.bookGenre === genre._id);

            
               const firstTwoBooks = genreBooks.filter((filteredBook, index) => {
                  return genre._id === filteredBook.bookGenre && index < 3;
               });

               return (
                  <div key={genre._id} style={{marginTop: "2rem"}}>
                    <h2> <a href={`/books_by_genre/${genre._id}`} style={{textDecoration: "none"}}>{genre.genreName} Books</a> </h2>
                     <div className="row">
                        {firstTwoBooks.map((filteredBook) => (
                           <div key={filteredBook._id} className="col-md-4 mb-4">
                              <div className="card cont h-100 shadow-sm">
                                 <img src={filteredBook.bookImage} 
                                 alt={filteredBook.bookTitle} 
                                 className="card-img-top"style={{width: "100%", maxHeight: "30vh",objectFit: "contain"}}
                                 />
                                  <div className="card-body">
                                 <h3> <a href={`/single_book/${filteredBook._id}`} style={{textDecoration: "none", fontWeight: "bold"}}>{filteredBook.bookTitle}</a></h3>
                                  <h4>
                                    <AuthorNames name ={filteredBook.bookAuthor} />
                                    
                                    </h4> 

                                    <h5 className="text-center"> <a href={`/borrow_book/${filteredBook._id}`} style={{textDecoration: "none"}}> BORROW BOOK </a> </h5>

                                 </div>
                                                        </div>
                           </div>
                        ))}
                     </div>
                  </div>
               );
            })}
         
      </div>
   );
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

export default Home;
