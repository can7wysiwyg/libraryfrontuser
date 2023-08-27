import "../styles/auth.css"

function Login() {
    return(<>
    <div className="container" style={{marginTop: "2rem"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header"><strong>Log In</strong></div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="text-muted" htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'  />
                  {/* <small id="emailHelp" className="form-text text-muted">We don't share email with anyone</small> */}
                </div>
                <div className="form-group">
                  <label className="text-muted" htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password'  />
                  {/* <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small> */}
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Check me out</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    
    </>)
}

export default Login