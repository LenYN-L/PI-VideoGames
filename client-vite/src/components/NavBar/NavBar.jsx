import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './NavBar.css'

export default function NavBar() {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/results/${name}`)
        setName('')
    }

    return (
        <div className="container-navbar">
            <ul className="navbar-li">
                <li>
                    <Link className="navbar-link" to='/home'>Home</Link>
                </li>
                <li>
                    <Link className="navbar-link navbar-link-li" to='/create'>Create_VideoGame</Link>
                </li>
            </ul>
            <div>
                <form className="navbar-form" onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        value={name} 
                        placeholder='Search Videogame' 
                        onChange={ (e) => setName(e.target.value)}
                    />
                    <button>Go</button>
                </form>
            </div>
        </div>
    )
}