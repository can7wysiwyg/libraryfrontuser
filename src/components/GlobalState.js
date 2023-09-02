import { createContext } from "react";
import UserApi from "./api/UserApi";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    let usertoken = JSON.parse(JSON.stringify(localStorage.getItem('usertoken')))


let state = {
    userApi: UserApi(),
    usertoken
}
return(<GlobalState.Provider value={state}>
            {children}
    </GlobalState.Provider >) 

}