import { useState } from "react";
import "../styles/auth.css";
import axios from "axios";

function Register() {
const[values, setValues]  = useState({fullname: "", email: "", phoneNumber: "", location: "", idNumber: "", DOB: "", password: ""})
const [userImage, setUserImage] = useState("") 

const handleImage = (event) => {
  const file = event.target.files[0];
  setUserImage(file);
}

const handleChange = (event) => {
  const {name, value} = event.target

  setValues((prevValues) => ({ ...prevValues, [name]: value }))

}


const formSubmit = async(event) => {
  event.preventDefault()

  let formData = new FormData()

  formData.append('userImage', userImage)
  formData.append('fullname', values.fullname)
  formData.append('password', values.password)
  formData.append('phoneNumber', values.phoneNumber)
  formData.append('email', values.email)
  formData.append('DOB', values.DOB)
  formData.append('location', values.location)
  formData.append('idNumber', values.idNumber)

  const res = await axios.post('/userroute/register', formData)

  alert(res.data.msg)

  window.location.href = "/login"


}



  
 
  return (
    <>
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>Create An Account To Start Borrowing Books</strong>
              </div>
              <div className="card-body">
                <form onSubmit={formSubmit}>
                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputEmail1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputName">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="userName"
                      placeholder="Write Your Name"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleChange}
                    
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputImage">
                    Upload Your Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="exampleInputFile"
                      onChange={handleImage}
                      
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputPhoneNumber">
                      Your Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPhoneNumber"
                      aria-describedby="phoneHumber"
                      placeholder="Write Your Phone Number"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputLocation">
                      Your Current Home
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputLocation"
                      aria-describedby="location"
                      placeholder="Write Your Current Home"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputDate">
                      Your Date Of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputDate"
                      aria-describedby="dateOfBirth"
                      placeholder="Write Your Date Of Birth"
                      name="DOB"
                      value={values.DOB}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted" htmlFor="exampleInputidNumber">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputidNumber"
                      aria-describedby="IDNumber"
                      placeholder="Write Your ID Number"
                      name="idNumber"
                      value={values.idNumber}
                      onChange={handleChange}
                    />
                  </div>







                  <div className="form-group">
                    <label
                      className="text-muted"
                      htmlFor="exampleInputPassword1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {/* <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small> */}
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Check me out
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
