// import "../styles/choices.css"

function Choices() {
    return(<>
    <div className="container-fluid d-flex justify-content-center align-items-center " >
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <a href="/register" className="card-title">REGISTER ACCOUNT</a>
              <p className="card-text">Create An Account To Start Borrowing And Reading Books</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <a href="/login" className="card-title">LOGIN TO YOUR ACCOUNT</a>
              <p className="card-text">Login To Your Account To Borrow And Read Books</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
    </>)
}

export default Choices