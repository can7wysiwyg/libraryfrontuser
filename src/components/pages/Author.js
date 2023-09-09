import { useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../GlobalState"

function Author() {
    const{id} = useParams()
   const state = useContext(GlobalState)
   const [authors] = state.authorsApi.authors
   
   let newAuthor = authors.find((author) => author._id === id)

  if(newAuthor === undefined) {
    return(<>
    <h2 className="text-center">i shot the sherif</h2>
    
    </>)
  }

    return(<>
    <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4" style={{marginTop: "6rem"}}>
              <img src={newAuthor.authorImage } alt={newAuthor.authorName} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{newAuthor.authorName}</h5>
                <p className="card-text" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  {newAuthor.authorCountry}
                </p>
                <p className="card-text" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                <a href={`/author_books/${newAuthor._id}`}>more books by author</a>
                </p>
                
              </div>
            </div>
          </div>
        </div> 
        
    
    
    </>)
}

export default Author