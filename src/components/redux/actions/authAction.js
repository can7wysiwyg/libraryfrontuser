import axios from "axios"
import { AUTH_ERROR, AUTH_REGISTER } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"

export function registerUser(data) {
    return async function(dispatch) {


        try {
            const response = await axios.post(`${ApiUrl}/userroute/register`, data)
            dispatch({type: AUTH_REGISTER})
            alert(response.data.msg)

             window.location.href = "/login"
            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error
        }

    }
}