import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, resetAll } from "../../redux/actions/actions"
import Videogame from "../../components/Videogames/Videogames"
import Pagination from "../../components/Pagination/Pagination"
import { Filter } from "../Filter/Filter"


export default function Home () {   
    const dispatch = useDispatch() 
    const videogames = useSelector( state => state.videogames)
    const filteredVideogames = useSelector(state => state.filteredVideogames)
    const filterBy = useSelector(state => state.filterBy)
    const orderBy = useSelector( state => state.orderBy)

    useEffect(() => {
        dispatch(resetAll())
        dispatch(getVideogames())
    }, [])

    let allVideogames;
    filterBy === "All" && orderBy === "Select"
      ? (allVideogames = videogames)
      : (allVideogames = filteredVideogames);

    function paginate(e, num) {
        e.preventDefault();
        setPage(num);
    }

    const [page, setPage] = useState(1);
    const [videogamesPerPage] = useState(15);

    let lastCardPerPage = page * videogamesPerPage;
    let firtsCardPerPage = lastCardPerPage - videogamesPerPage;
    let currentPageGames = allVideogames.slice(firtsCardPerPage, lastCardPerPage);

    return(
        <div>
            <Filter paginate={paginate} />
            <Videogame videogames={currentPageGames}/>
            <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={allVideogames.length} paginate={paginate} />
        </div>
    )
}


