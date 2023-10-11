import { useState } from "react"
import "../styles/auth.css"
import axios from "axios"

function Login() {
const[values, setValues] =  useState({email: "", password: ""})

const handleChange = (event) => {
  const {name, value} = event.target

  setValues((prevValues) => ({ ...prevValues, [name]: value }))

}


const formSubmit = async(event) => {
  event.preventDefault()

  const res = await axios.post('/userroute/login', {...values})
    localStorage.setItem("usertoken", res.data.accesstoken); 
    if(res.data.msg) {
        alert(res.data.msg)
        window.location.href = "/login"
    } else {
        window.location.href = "/"
    }

}


    return(<>
    <div className="container" style={{marginTop: "2rem"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header"><strong>Log In</strong></div>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="form-group">
                  <label className="text-muted" htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={values.email} onChange={handleChange}  />
              
                </div>
                <div className="form-group">
                  <label className="text-muted" htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={values.password} onChange={handleChange}  />
                
                </div>
                
                <button type="submit" className="btn btn-primary">Login</button>
                <hr/>
                <a href="/forgot_password" style={{fontWeight: "bolder"}}>Forgot Password?</a>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    
    </>)
}

export default Login