import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../GlobalState"
import "./myinfo.css"
import axios from "axios"
import moment from "moment/moment"

function MyInfo() {
   const state = useContext(GlobalState)
   const usertoken = state.usertoken
   const[person, setPerson] = useState({})
 
   useEffect(() => {

    const getUser = async() => {
const res = await axios.get(`/userroute/user`, {
    headers: {
        Authorization: `Bearer ${usertoken}`
    }

})

setPerson(res.data);

    }

    getUser()

   }, [usertoken])


   console.log(person);

    return(<>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="library-card text-center">
            <h2>Member Card</h2>
            <img src={person.userImage} alt={person.fullname} className="img-fluid mt-3 mb-3" />
            <p>Name: {person.fullname}</p>
            <p>Birthday: {person.DOB} </p>
            <p>Member ID: {person.idNumber} </p>
            <p>Joined: { moment(person.createdAt).format("MMM D YYYY") }</p>
            <p>Email: {person.email} </p>
            <p>Home: {person.location} </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>

    
    
    </>)
}

export default MyInfo