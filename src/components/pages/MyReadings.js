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
    
    </>)
}


    return(<>
    <div className="container text-center">

        <DisplayFirstBook myBooks={myBooks} />

        { myBooks.BookTwo === undefined ? "" : <DisplaySecondBook myBooks={myBooks} />}

        {myBooks.BookThree === undefined ? "" : <DisplayThirdBook myBooks={myBooks} />}



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


export default MyReadings