import { NavLink } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
    return(
        <div className='background'>
            <div className='container-landing'>
                <p className='title'>Welcome to VideoGames</p>
                <NavLink className='enter' to='/home'>Touch Mee!</NavLink>
            </div>
        </div>
    )
}

