import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getVideogameById } from "../../redux/actions/actions"
import NotFound from "../NotFound/NotFound"
import './GameDetail.css'

export default function GameDetail() {
    const dispatch = useDispatch()
    const videogame = useSelector( store => store.searchVideoGameById)
    const param = useParams()

    useEffect(() => {
        dispatch(getVideogameById(param.id))
    },[])

    return (
        <div className="card_detail">
            <h2>{videogame.name}</h2>
            <h5>({videogame.released})</h5>
            <div className="card_detail-img">
                {
                    videogame.image === null || !videogame.image ?
                    <NotFound image ={'noimage'}/>
                    :
                    <img src={videogame.image} alt={videogame.name} ></img>

                    
                }
            </div>
            <div className="card_detail-text">
                <div className="card-text">
                    <h2>About this game:</h2>
                    <p>{videogame.description}</p>
                </div>
                <div className="card-genres">
                    <div className="genres">
                        It's an {videogame.genres} game ranked at {videogame.rating} points.  
                    </div>
                </div>
                <div className="card-platforms">
                    <div className="platforms">
                        <p>Play it at {videogame.platforms}.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}