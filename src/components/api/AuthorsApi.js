import axios from "axios"
import { useEffect, useState } from "react"

function AuthorsApi() {
    const[authors, setAuthors] = useState([])

    useEffect(() => {

        const getAuthors = async() => {

            const res = await axios.get('/author/show_authors')

            setAuthors(res.data.authors)
            


        }

        getAuthors()


    }, [])


    return{
        authors: [authors, setAuthors]

    }
}

export default AuthorsApi