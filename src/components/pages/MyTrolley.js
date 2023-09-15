import { useContext, useEffect, useState } from "react";
import { getCart, removeItem, emptyCart } from "../api/TrolleyApi";
import { GlobalState } from "../GlobalState";

function MyTrolley() {
//   const state = useContext(GlobalState);
  const [items, setItems] = useState([]);



  useEffect(() => {
    const cartItems = getCart().map((item) => ({ ...item, quantity: 1 }));
    setItems(cartItems);
  }, []);


  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    setItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const handleEmptyCart = () => {
    emptyCart(() => {
      setItems([]);
    });
    window.location.reload(); // Refresh the page after emptying the cart
  };



  if(items.length === 0) {
    return(<>
    
<h2 className="text-center">no books in trolley</h2>
<p className="text-center"> back to <a href="/">home</a></p>
    </>)
  }

  

  return (
    <>
    

      <div className="row justify-content-center"  style={{marginTop: "2rem", marginBottom: "2rem"}}>
        {items?.map((item) => (
          <div key={item._id} className="col-md-8" style={{marginBottom: "2rem"}}>
            <div className="card cont h-100 shadow-sm"  >
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
                <button className="btn btn-danger" onClick={() => handleRemoveItem(item._id)}>REMOVE BOOK</button>
              </div>
            </div>
          </div>
        ))}

<div style={{ textAlign: "center", margin: "2rem" }}>
        <button className="btn btn-danger" onClick={handleEmptyCart} style={{ marginRight: "3rem" }}>
          Empty Trolley
        </button>
        <button className="btn btn-primary">
          BORROW BOOKS
        </button>
      </div>

      </div>
    </>
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

export default MyTrolley;
