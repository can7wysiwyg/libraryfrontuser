import axios from "axios"
import { useEffect, useState } from "react"

function GenresApi() {
    const[genres, setGenres] = useState([])

    useEffect(() => {

        const getGenres = async() => {

            const res = await axios.get('/genre/show_all')

            setGenres(res.data.genres)

        }

        getGenres()


    }, [])


    return{

        genres: [genres, setGenres]

    }
}

export default GenresApi