import { useContext, useEffect,  useState } from "react";
import { GlobalState } from "../GlobalState";
import { addItem, getCart } from "../api/TrolleyApi";
import axios from "axios"



const FirstCheck = ({filteredBook}) => {
    const state = useContext(GlobalState);
    const[client] = state.userApi.client
    const usertoken = state.usertoken
    const [isLogged] = state.userApi.isLogged;
    const [redirect, setRedirect] = useState(false);
    const [items, setItems] = useState([]);
    const[result, setResult] = useState({})
    const [getCard, setGetCard] = useState({})
  
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
  
   }, [items, filteredBook._id ])
  

   useEffect(() => {

    const getIdFromCard = async() => {
      if(client === "") {
           return ""
     

      }

      const res = await axios.get(`/card/show_to_user/${client}`, {
        headers: {
          Authorization: `Bearer ${usertoken}`
        }
      }
      )

      
      setGetCard(res.data.card);


    }

    getIdFromCard()


  }, [client, usertoken])

  
  
  
  
  
     
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
      

        
        

        const AuthoCheck = () => {

           if(isLogged === false) {
                
                return(<>
          
          <h5 className="text-center text-primary"
                                    onClick={alezz}
                                  >
                                    Borrow Book
                                  </h5>
                
                
                </>)
              }

            
            
            if(getCard === undefined || getCard === null) {

      
           if(isLogged === true && items.length >= 3) {
                
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
            
                    
                  
          




            
            } else if( getCard !== undefined || getCard !== null) {

                 const alerted = () => {
  alert("You Already Borrowed A Book(s), Return The Book(s) To Borrow Again")

}




  return(<>
  <h5 className="text-center" onClick={alerted}>BORROW</h5>
  
  </>)



            }

        

            
        }



      
      
     
  
      return(<>
      {shouldRedirect(redirect)}
  
      
  
      {    AuthoCheck() }
      
      
      </>)
      
    
  
      
  
  
  }

  
  export default FirstCheck