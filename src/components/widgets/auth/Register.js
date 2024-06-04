import { useState } from "react"
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

function Register() {

    const[formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        idNumber: "",
        phoneNumber: ""
    })


    const dispatch = useDispatch()



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        


    }



   async function formSubmit(event) {

        event.preventDefault()

        await dispatch(registerUser(formData))



    }

    return(<>
    <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>Create An Account To Start Borrowing Books</strong>
              </div>
              <div className="card-body ">
                <form onSubmit={formSubmit}>
                  <div className="form-group">
                    
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="userName"
                      placeholder="Write Your Name"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                    
                    />
                  </div>
                 <br />
                  
                  <div className="form-group">
                    
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhoneNumber"
                      aria-describedby="phoneHumber"
                      placeholder="Write Your Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <br />

                  
                  
                  <div className="form-group">
                   
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputidNumber"
                      aria-describedby="IDNumber"
                      placeholder="Write Your ID Number"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    
                  </div>

                  <br />
                  
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    
    </>)
}


export default Register