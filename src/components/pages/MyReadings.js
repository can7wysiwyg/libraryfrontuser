import { useContext, useEffect,  useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import moment from "moment/moment";


function MyReadings() {
    const state = useContext(GlobalState);
    const[client] = state.userApi.client
    const usertoken = state.usertoken
    const[myBooks, setMyBooks] = useState({})

    
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


if(myBooks === undefined || myBooks === null || myBooks === "") {
    return(<>
    
    <h3 className="text-center">as your books load</h3>
     <h4 className="text-center">you can borrow books, if you have not borrowed already..</h4>
     <h5 className="text-center">go to home to start your search for a book <a href="/">home</a></h5>
    
    </>)
}


    return(<>
    <div className="container text-center">

        <DisplayFirstBook myBooks={myBooks} />

        { myBooks.BookTwo === "" ? "" : <DisplaySecondBook myBooks={myBooks} />}

        {myBooks.BookThree === "" ? "" : <DisplayThirdBook myBooks={myBooks} />}



    </div>
    
    
    </>)
}


const DisplayFirstBook = ({myBooks}) => {
const state = useContext(GlobalState)
const[books] = state.booksApi.books
const[result, setResult] = useState({})

 
    useEffect(() => {

 if(myBooks.BookOne) {

const item = books.find((book) => book._id === myBooks.BookOne)
setResult(item)

 }


    }, [books, myBooks.BookOne])
 let named = result.bookFile

 console.log(named);
    

    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
    <div className="col-md-8">
            <div className="card mb-4">
              <img src={result.bookImage} alt={result.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{result.bookTitle}</h5>
                <p className="card-text">released on {moment(result.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}}>
                   <a href={named} style={{textDecoration: "none"}} target="_blank" rel="noreferrer">
                     CLICK TO READ 
                     </a>
                     
                     </h5>
                
                
                
              </div>
            </div>
          </div>





    </div>
    
    
    </>)
}


const DisplaySecondBook = ({myBooks}) => {

    const state = useContext(GlobalState)
const[books] = state.booksApi.books
const[result, setResult] = useState({})

 
    useEffect(() => {

 if(myBooks.BookTwo) {

const item = books.find((book) => book._id === myBooks.BookTwo)
setResult(item)

 }


    }, [books, myBooks.BookTwo])

    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
    <div className="col-md-8">
            <div className="card mb-4">
              <img src={result.bookImage} alt={result.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{result.bookTitle}</h5>
                <p className="card-text">released on {moment(result.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} > <a href={result.bookFile} style={{textDecoration: "none"}} target="_blank" rel="noreferrer"> CLICK TO READ </a></h5>
                
                
                
              </div>
            </div>
          </div>





    </div>
    
    
    </>)


    
}

const DisplayThirdBook = ({myBooks}) => {

    const state = useContext(GlobalState)
const[books] = state.booksApi.books
const[result, setResult] = useState({})

 
    useEffect(() => {

 if(myBooks.BookThree) {

const item = books.find((book) => book._id === myBooks.BookThree)
setResult(item)

 }


    }, [books, myBooks.BookThree])

    
    return(<>
    <div className="row justify-content-center" style={{marginTop: "2rem"}}>
    myBooks.BookThree === "" ? "" :  <div className="col-md-8">
            <div className="card mb-4">
              <img src={result.bookImage} alt={result.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{result.bookTitle}</h5>
                <p className="card-text">released on {moment(result.bookReleaseDate).format("MMM D YYYY")} </p>
                <h5 className="card-text text-primary" style={{cursor: "pointer"}} > <a href={result.bookFile} style={{textDecoration: "none"}} target="_blank" rel="noreferrer"> CLICK TO READ </a></h5>
                
                
                
              </div>
            </div>
          </div>
                      




    </div>
    
    
    </>)

}


export default MyReadings