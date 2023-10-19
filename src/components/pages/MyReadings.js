import { useContext, useEffect,  useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import moment from "moment/moment";


function MyReadings() {
    const state = useContext(GlobalState);
    const[client] = state.userApi.client
    const usertoken = state.usertoken
    
    const[isLogged] = state.userApi.isLogged
  
    const[clientNum] = state.userApi.clientNum
  

    const[myBooks, setMyBooks] = useState({})

    useEffect(() => {

      if( isLogged === true && clientNum !== 1) {
        return(<>
        
        {window.location.href = "/submit_report"}
        
        </>)
      }
      


    }, [clientNum, isLogged])

    
    useEffect(() => {


       
        
            const getReadings = async() => {

                if(client === "") {
                    return ""
                }
        

      
            const res = await axios.get(`/card/show_owner_books/${client}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }
            })

            setMyBooks(res.data.result);

        }

        getReadings()


        

       

        

    }, [client, usertoken])

    if( isLogged === true && clientNum !== 1) {
      return(<>
      
      {window.location.href = "/submit_report"}
      
      </>)
    }
    


if(myBooks === undefined || myBooks === null || myBooks === "") {
    return(<>
    
    <h3 className="text-center">as your books load</h3>
     <h4 className="text-center">you can borrow books, if you have not borrowed already..</h4>
     <h5 className="text-center">go to home to start your search for a book <a href="/">home</a></h5>
    
    </>)


}

if(myBooks === "") {
  return(<>
  h
  </>)
}


    return(<>
    <div className="container text-center">

    { myBooks.bookOne === "" ? "" :   <DisplayFirstBook myBooks={myBooks} /> }

        { myBooks.bookTwo === "" ? "" : <DisplaySecondBook myBooks={myBooks} />}

        {myBooks.bookThree === "" ? "" : <DisplayThirdBook myBooks={myBooks} />}



    </div>
    
    
    </>)
}


const DisplayFirstBook = ({myBooks}) => {
const state = useContext(GlobalState)
const[books] = state.booksApi.books
const usertoken = state.usertoken
const[items, setItems] = useState({})


 
    useEffect(() => {

 if(myBooks.bookOne) {

const item = books.find((book) => book._id === myBooks.bookOne)
setItems(item)

 }


    }, [books, myBooks.bookOne])
 let named = items.bookFile

 

 const deleteBook = async (event) => {
  event.preventDefault();
  
  try {
    const response = await axios.put(`/card/update_book_one/${myBooks._id}`, null, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    });
    
    alert(response.data.msg);


  
   const resp = await axios.delete(`/card/delete_book/${myBooks._id}`, {
      headers: {
        Authorization: `Bearer ${usertoken}`
      }
    })

    alert(resp.data.msg);

  
    
    
    window.location.href = "/my_readings";
  } catch (error) {
    console.error("Error:", error);
    // Handle errors if necessary
  }
}





 
    

    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
    <div className="col-md-8">
            <div className="card mb-4">
              <img src={items.bookImage} alt={items.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{items.bookTitle}</h5>
                <p className="card-text">released on {moment(items.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}}>
                   <a href={named} style={{textDecoration: "none"}} target="_blank" rel="noreferrer">
                     CLICK TO READ 
                     </a>
                     
                     </h5>

                     

                       <h5 className="card-text text-primary" style={{cursor: "pointer"}} onClick={deleteBook}>not satisfied? return book</h5>

                    
                
                
                
              </div>
            </div>
          </div>





    </div>
    
    
    </>)
}


const DisplaySecondBook = ({myBooks}) => {

    const state = useContext(GlobalState)
    const usertoken = state.usertoken
const[books] = state.booksApi.books
const[result, setResult] = useState({})

 
    useEffect(() => {

 if(myBooks.bookTwo) {

const item = books.find((book) => book._id === myBooks.bookTwo)
setResult(item)

 }


    }, [books, myBooks.bookTwo])


    const deleteBook = async (event) => {
      event.preventDefault();
      
      try {
        const response = await axios.put(`/card/delete_book_two/${myBooks._id}`, null, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        
        alert(response.data.msg);
    
    
      
       const resp = await axios.delete(`/card/delete_book/${myBooks._id}`, {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        })
    
        alert(resp.data.msg);
    
      
        
        
        window.location.href = "/my_readings";
      } catch (error) {
        console.error("Error:", error);
        // Handle errors if necessary
      }
    }
    
    

    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
    <div className="col-md-8">
            <div className="card mb-4">
              <img src={result.bookImage} alt={result.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{result.bookTitle}</h5>
                <p className="card-text">released on {moment(result.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} > <a href={result.bookFile} style={{textDecoration: "none"}} target="_blank" rel="noreferrer"> CLICK TO READ </a></h5>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} onClick={deleteBook}>not satisfied? return book</h5>

                
                
              </div>
            </div>
          </div>





    </div>
    
    
    </>)


    
}

const DisplayThirdBook = ({myBooks}) => {

    const state = useContext(GlobalState)
    const usertoken = state.usertoken
const[books] = state.booksApi.books
const[result, setResult] = useState({})

 
    useEffect(() => {

 if(myBooks.bookThree) {

const item = books.find((book) => book._id === myBooks.bookThree)
setResult(item)

 }


    }, [books, myBooks.bookThree])



    const deleteBook = async (event) => {
      event.preventDefault();
      
      try {
        const response = await axios.put(`/card/delete_book_three/${myBooks._id}`, null, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        
        alert(response.data.msg);
    
    
      
       const resp = await axios.delete(`/card/delete_book/${myBooks._id}`, {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        })
    
        alert(resp.data.msg);
    
      
        
        
        window.location.href = "/my_readings";
      } catch (error) {
        console.error("Error:", error);
        // Handle errors if necessary
      }
    }
    
    


    
    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
     <div className="col-md-8">
            <div className="card mb-4">
              <img src={result.bookImage} alt={result.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{result.bookTitle}</h5>
                <p className="card-text">released on {moment(result.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} > <a href={result.bookFile} style={{textDecoration: "none"}} target="_blank" rel="noreferrer"> CLICK TO READ </a></h5>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} onClick={deleteBook}>not satisfied? return book</h5>

                
                
              </div>
            </div>
          </div>
                      




    </div>
    
    
    </>)

}




export default MyReadings