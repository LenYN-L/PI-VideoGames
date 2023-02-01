import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { searchVideogames } from "../../redux/actions/actions"
import Videogame from "../../components/Videogames/Videogames"
import Pagination from "../../components/Pagination/Pagination"
import NotFound from "../../components/NotFound/NotFound"
import Loading from "../../components/Loading/Loading"
import './Search.css'

export default function Search () {
    const dispatch = useDispatch()
    let { name } = useParams()
    const searchVideogame = useSelector(state => state.searchVideoGameByName)

    useEffect(() => {
        dispatch(searchVideogames(name))
    },[name])

    function paginate(e, num){
        e.preventDefault()
        setPage(num)
    }

    const [ page, setPage] = useState(1)
    const [videogamePerPage] = useState(10)

    let lastCardPerPage = page * videogamePerPage
    let firtsCardPerPage = lastCardPerPage - videogamePerPage
    let currentPageGames = searchVideogame.slice(firtsCardPerPage, lastCardPerPage)

    return(
        <div className="search">
            {
                searchVideogame.length > 0 
                ?
                <>
                    <Videogame videogames={currentPageGames} />
                    <Pagination videogamesPerPage={videogamePerPage} totalVideogames={searchVideogame.length} paginate={paginate}/>
                </>
                :
                <Loading></Loading>
            }
        </div>
    )    
}