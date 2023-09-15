import { useContext, useEffect,  useState } from "react";
import { GlobalState } from "../GlobalState";
import "./hover.css";
import { addItem, getCart } from "../api/TrolleyApi";

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
          <div key={genre._id} style={{ marginTop: "2rem" }}>
            <h2>
              {" "}
              <a
                href={`/books_by_genre/${genre._id}`}
                style={{ textDecoration: "none" }}
              >
                {genre.genreName} Books
              </a>{" "}
            </h2>
            <div className="row">
              {firstTwoBooks.map((filteredBook) => (
                <div key={filteredBook._id} className="col-md-4 mb-4">
                  <div className="card cont h-100 shadow-sm">
                    <img
                      src={filteredBook.bookImage}
                      alt={filteredBook.bookTitle}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        maxHeight: "30vh",
                        objectFit: "contain",
                      }}
                    />
                    <div className="card-body">
                      <h3>
                        {" "}
                        <a
                          href={`/single_book/${filteredBook._id}`}
                          style={{ textDecoration: "none", fontWeight: "bold" }}
                        >
                          {filteredBook.bookTitle}
                        </a>
                      </h3>
                      <h4>
                        <AuthorNames name={filteredBook.bookAuthor} />
                      </h4>
                      <BorrowComp filteredBook={filteredBook} />

                     
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


const BorrowComp = ({filteredBook}) => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [redirect, setRedirect] = useState(false);
  const [items, setItems] = useState([]);
  const[result, setResult] = useState({})
  

  useEffect(() => {
   const cartItems = getCart().map(item => ({ ...item, quantity: 1 }));
   setItems(cartItems);
 }, []);




 useEffect(() => {

  const doFiltering = () => {
    

      if(filteredBook._id) {

        items?.filter((item) => {
          if(item._id === filteredBook._id)  setResult(item)
      

        } )
      

      }

    

  }

  doFiltering()

 }, [items, filteredBook._id])

 
 if(result === undefined) {
  return(<>
  
  <h1 className="text-center">do u think about it?</h1>
  </>)
 }
 
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/");
    }
  };

  const alezz = () => {
    alert("You need an account to borrow a book. Create One.");
  };


  const checkingz = () => {

    if(isLogged === false) {

      return(<>

<h5 className="text-center text-primary"
                          onClick={alezz}
                        >
                          Borrow Book
                        </h5>
      
      
      </>)
    } else if(isLogged === true && items.length >= 3) {

      return(<>
      <h5 className="text-center">

     BORROW LIMIT IS THREE

      </h5>
      
      </>)
    }
    
    
    
    else if(isLogged === true) {

      return(<>
   { result._id === filteredBook._id ? <h5 className="text-center">Book Is In Trolley </h5> : <h5 className="text-center text-primary"
                        onClick={ () => {
                           addItem(filteredBook, () => {
                              setRedirect(true)
                             
                           })
                        }
                           
                        }
                        >
                          Borrow Book
                        </h5> }   
      
      
      </>
      )
    }
  }



  return(<>
  {shouldRedirect(redirect)}

  {checkingz()}
  
  
  </>)
}


const AuthorNames = ({ name }) => {
  const state = useContext(GlobalState);
  const [authors] = state.authorsApi.authors;
  const [displayName, setDisplayName] = useState({});

  useEffect(() => {
    if (name) {
      authors?.forEach((author) => {
        if (author._id === name) setDisplayName(author);
      });
    }
  }, [name, authors]);

  return (
    <>
      <a
        href={`/show_author/${displayName._id}`}
        style={{ textDecoration: "none" }}
      >
        {" "}
        {displayName.authorName}{" "}
      </a>
    </>
  );
};

export default Home;
