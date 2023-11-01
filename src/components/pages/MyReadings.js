import { useContext, useEffect,  useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import moment from "moment/moment";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




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


function DisplayFirstBook({ myBooks }) {
  const state = useContext(GlobalState);
  const [books] = state.booksApi.books;
  const usertoken = state.usertoken;
  const [items, setItems] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(currentPage);

  // Add memory function to retrieve and set the current page from local storage
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPDFPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  const handleButtonClick = () => {
    setPdfVisible(true);
  };

  useEffect(() => {
    if (myBooks.bookOne) {
      const item = books.find((book) => book._id === myBooks.bookOne);
      setItems(item);
    }
  }, [books, myBooks.bookOne]);

  const named = items.bookFile;

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
          Authorization: `Bearer ${usertoken}`,
        },
      });

      alert(resp.data.msg);

      window.location.href = '/my_readings';
    } catch (error) {
      console.error('Error:', error);
      // Handle errors if necessary
    }
  };

  // Add a function to update the current page and store it in local storage
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem('currentPDFPage', newPage);
  };

  // Add a function to handle page search
  const handleSearchPage = (page) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
      localStorage.setItem('currentPDFPage', page);
    }
  };

  return (
    <>
      <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
        <div className="col-md-8">
          <div className="card mb-4">
            <img src={items.bookImage} alt={items.bookTitle} style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} />
            <div className="card-body text-center">
              <h5 className="card-title">{items.bookTitle}</h5>
              <p className="card-text">released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
              <div>
                <button onClick={handleButtonClick}>Show PDF</button>
                {pdfVisible && (
                  <div>
                    <Document
                      file={named}
                      onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setSearchPage(currentPage);
                      }}
                    >
                      <Page pageNumber={currentPage} />
                    </Document>
                    <div>
                      <input
                        type="number"
                        value={searchPage}
                        onChange={(e) => setSearchPage(parseInt(e.target.value))}
                      />
                      <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
                    </div>
                    <div>
                      <p>Page {currentPage} of {numPages}</p>
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => updateCurrentPage(currentPage - 1)}
                      >
                        Previous Page
                      </button>
                      <button
                        disabled={currentPage >= numPages}
                        onClick={() => updateCurrentPage(currentPage + 1)}
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <h5 className="card-text text-primary" style={{ cursor: 'pointer' }} onClick={deleteBook}>
                not satisfied? return book
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



function DisplaySecondBook ({ myBooks }) {
  const state = useContext(GlobalState);
  const [books] = state.booksApi.books;
  const usertoken = state.usertoken;
  const [items, setItems] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(currentPage);

  // Add memory function to retrieve and set the current page from local storage
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPDFPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  const handleButtonClick = () => {
    setPdfVisible(true);
  };

  useEffect(() => {
    if (myBooks.bookTwo) {
      const item = books.find((book) => book._id === myBooks.bookTwo);
      setItems(item);
    }
  }, [books, myBooks.bookTwo]);

  const named = items.bookFile;

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
          Authorization: `Bearer ${usertoken}`,
        },
      });

      alert(resp.data.msg);

      window.location.href = '/my_readings';
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem('currentPDFPage', newPage);
  };

  
  const handleSearchPage = (page) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
      localStorage.setItem('currentPDFPage', page);
    }
  };

  return (
    <>
      <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
        <div className="col-md-8">
          <div className="card mb-4">
            <img src={items.bookImage} alt={items.bookTitle} style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} />
            <div className="card-body text-center">
              <h5 className="card-title">{items.bookTitle}</h5>
              <p className="card-text">released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
              <div>
                <button onClick={handleButtonClick}>Show PDF</button>
                {pdfVisible && (
                  <div>
                    <Document
                      file={named}
                      onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setSearchPage(currentPage);
                      }}
                    >
                      <Page pageNumber={currentPage} />
                    </Document>
                    <div>
                      <input
                        type="number"
                        value={searchPage}
                        onChange={(e) => setSearchPage(parseInt(e.target.value))}
                      />
                      <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
                    </div>
                    <div>
                      <p>Page {currentPage} of {numPages}</p>
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => updateCurrentPage(currentPage - 1)}
                      >
                        Previous Page
                      </button>
                      <button
                        disabled={currentPage >= numPages}
                        onClick={() => updateCurrentPage(currentPage + 1)}
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <h5 className="card-text text-primary" style={{ cursor: 'pointer' }} onClick={deleteBook}>
                not satisfied? return book
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


function DisplayThirdBook ({ myBooks }) {
  const state = useContext(GlobalState);
  const [books] = state.booksApi.books;
  const usertoken = state.usertoken;
  const [items, setItems] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(currentPage);

  // Add memory function to retrieve and set the current page from local storage
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPDFPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  const handleButtonClick = () => {
    setPdfVisible(true);
  };

  useEffect(() => {
    if (myBooks.bookThree) {
      const item = books.find((book) => book._id === myBooks.bookThree);
      setItems(item);
    }
  }, [books, myBooks.bookThree]);

  const named = items.bookFile;

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
          Authorization: `Bearer ${usertoken}`,
        },
      });

      alert(resp.data.msg);

      window.location.href = '/my_readings';
    } catch (error) {
      console.error('Error:', error);
      // Handle errors if necessary
    }
  };

  // Add a function to update the current page and store it in local storage
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem('currentPDFPage', newPage);
  };

  // Add a function to handle page search
  const handleSearchPage = (page) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
      localStorage.setItem('currentPDFPage', page);
    }
  };

  return (
    <>
      <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
        <div className="col-md-8">
          <div className="card mb-4">
            <img src={items.bookImage} alt={items.bookTitle} style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} />
            <div className="card-body text-center">
              <h5 className="card-title">{items.bookTitle}</h5>
              <p className="card-text">released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
              <div>
                <button onClick={handleButtonClick}>Show PDF</button>
                {pdfVisible && (
                  <div>
                    <Document
                      file={named}
                      onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setSearchPage(currentPage);
                      }}
                    >
                      <Page pageNumber={currentPage} />
                    </Document>
                    <div>
                      <input
                        type="number"
                        value={searchPage}
                        onChange={(e) => setSearchPage(parseInt(e.target.value))}
                      />
                      <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
                    </div>
                    <div>
                      <p>Page {currentPage} of {numPages}</p>
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => updateCurrentPage(currentPage - 1)}
                      >
                        Previous Page
                      </button>
                      <button
                        disabled={currentPage >= numPages}
                        onClick={() => updateCurrentPage(currentPage + 1)}
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <h5 className="card-text text-primary" style={{ cursor: 'pointer' }} onClick={deleteBook}>
                not satisfied? return book
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}






export default MyReadings