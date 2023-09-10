import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../GlobalState"
import axios from "axios"

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

console.log(res.data);

    }

    getUser()

   }, [usertoken])

    return(<>
    
    
    </>)
}

export default MyInfo