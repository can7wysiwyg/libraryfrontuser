import axios from "axios"
import { useEffect, useState } from "react"

function UserApi() {
    const [isLogged, setIsLogged] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [onPermToBorow, setOnPermToBorrow] = useState(false)
    const [onSuspension, seOnSuspension] = useState(false)
    const[client, setClient] = useState("")


    let usertoken = JSON.parse(JSON.stringify(localStorage.getItem('usertoken')))


    useEffect(() => {
        if(usertoken) {
           const getUser = async() => {
             const res = await axios.get('/userroute/user', {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }
             })

             setIsLogged(true)
             setClient(res.data._id)

             res.data.role === 1 && res.data.permToBorrow === true ? setOnPermToBorrow(true) : setOnPermToBorrow(false)
             res.data.role === 1 ? setIsUser(true) : setIsUser(false)
             res.data.role !== 1 ? setIsUser(false) : setIsUser(true)
             

     

           }

           getUser()
        }

    }, [usertoken])



    return{
isUser: [isUser, setIsUser],
isLogged: [isLogged, setIsLogged],
onPermToBorow: [onPermToBorow, setOnPermToBorrow],
onSuspension: [onSuspension, seOnSuspension],
client: [client, setClient]

    }
}

export default UserApi