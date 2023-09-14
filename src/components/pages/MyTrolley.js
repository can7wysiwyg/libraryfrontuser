import { useContext, useEffect, useState } from "react";
import { getCart } from "../api/TrolleyApi";
import { GlobalState } from "../GlobalState";

function MyTrolley() {
//   const state = useContext(GlobalState);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = getCart().map((item) => ({ ...item, quantity: 1 }));
    setItems(cartItems);
  }, []);

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
              </div>
            </div>
          </div>
        ))}
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
