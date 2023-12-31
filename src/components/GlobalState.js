import { createContext } from "react";
import UserApi from "./api/UserApi";
import BooksApi from "./api/BooksApi";
import GenresApi from "./api/GenresApi"
import AuthorsApi from "./api/AuthorsApi"


export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    let usertoken = JSON.parse(JSON.stringify(localStorage.getItem('usertoken')))
    let toBorrowBooks = JSON.parse(JSON.stringify(localStorage.getItem('book')))


let state = {
    userApi: UserApi(),
    booksApi: BooksApi(),
    genresApi: GenresApi(),
    authorsApi: AuthorsApi(),
    usertoken,
    toBorrowBooks
}
return(<GlobalState.Provider value={state}>
            {children}
    </GlobalState.Provider >) 

}