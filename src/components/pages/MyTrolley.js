import { useContext, useEffect, useState } from "react";
import { getCart, removeItem, emptyCart } from "../api/TrolleyApi";
import { GlobalState } from "../GlobalState";
import axios from "axios";

function MyTrolley() {
 const state = useContext(GlobalState)
  const [items, setItems] = useState([]);
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
    const cartItems = getCart().map((item) => ({ ...item, quantity: 1 }));
    setItems(cartItems);
  }, []);


 

  let extracted = {};
items.forEach((item, index) => {
  extracted[`book${index + 1}`] = item._id;
});

if(Object.keys(extracted).length === 0) {
  return(<>
  
  <h1 className="text-center">as products loads...</h1>
  </>)
}


  
  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const handleEmptyCart = () => {
    emptyCart(() => {
      setItems([]);
    });
    window.location.reload(); // Refresh the page after emptying the cart
  };

  if (items.length === 0) {
    return (
      <>
        <h2 className="text-center">no books in trolley</h2>
        <p className="text-center">
          {" "}
          back to <a href="/">home</a>
        </p>
      </>
    );
  }

  return (
    <>
      <div
        className="row justify-content-center"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        {items?.map((item) => (
          <div
            key={item._id}
            className="col-md-8"
            style={{ marginBottom: "2rem" }}
          >
            <div className="card cont h-100 shadow-sm">
              <img
                src={item.bookImage}
                alt={item.bookTitle}
                className="card-img-top"
                style={{
                  width: "100%",
                  maxHeight: "30vh",
                  objectFit: "contain",
                }}
              />
              <div className="card-body">
                <h3>
                  <a
                    href={`/single_book/${item._id}`}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    {item.bookTitle}
                  </a>
                </h3>
                <h4>
                  <AuthorNames name={item.bookAuthor} />
                </h4>

                <h5 className="text-center">
                  {" "}
                  <a
                    href={`/borrow_book/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    BORROW BOOK{" "}
                  </a>{" "}
                </h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  REMOVE BOOK
                </button>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button
            className="btn btn-danger"
            onClick={handleEmptyCart}
            style={{ marginRight: "3rem" }}
          >
            Empty Trolley
          </button>

          <SubmitButton extracted={extracted} />
        </div>
      </div>
    </>
  );
}



const SubmitButton = ({extracted}) => {
  const state = useContext(GlobalState);
  const[client] = state.userApi.client
  const usertoken = state.usertoken
  
  const values = {
    bookOne: extracted.book1 || '',
    bookTwo: extracted.book2 || '',
    bookThree: extracted.book3 || '',
    borrower: ''
  };
  

  

  const handleSubmit = async(event) => {
    event.preventDefault()

    const res = await axios.post(`/borrow/borrow_books/${client}`, {...values}, {
      headers: {
        Authorization: `Bearer ${usertoken}`
      }
    } )

    alert(res.data.msg);

    localStorage.removeItem('book')

    window.location.href = "/my_readings"


  }



  return(<>

<button className="btn btn-primary" onClick={handleSubmit}>BORROW BOOK</button> 


</>)}


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

export default MyTrolley;
