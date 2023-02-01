import Card from "../Card/Card"
import Loading from "../Loading/Loading"
import './Videogames.css'

export default function Videogame ({videogames}) {
    return(
        <div className="videogames">
            {videogames.length > 0 
            ? videogames.map(data => {
                return(
                    <div key={data.id}>
                        <Card data={data}/>
                    </div>
                )
            }) 
            : <Loading/>}
        </div>
    )
}
