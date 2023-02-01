import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVideogame, getGenres } from '../../redux/actions/actions'
import './Create.css'


export default function Create () {   
    const dispatch = useDispatch()
    const genres = useSelector( store => store.genres)
    const allPlatforms = ['PC', 'IOS', 'Android', 'PlayStation 4', 'PlayStation 5', 'Xbox', 'PS Vita']
    
    const [game, setGame] = useState({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        genres: [],
        platforms: [],
    })

    const filterArr = (arr) => {
        let arr2 = []
        arr.map( valor => {
            if(!arr2.includes(valor)) arr2.push(valor)
            else arr2.splice(arr2.indexOf(valor), 1)
        })
        return arr2
    }

    const filterGenres = filterArr(game.genres)
    const filterPlatForms = filterArr(game.platforms)
    
    const obj = {
        name: game.name,
        description: game.description,
        image: game.image,
        released: game.released,
        rating: game.rating,
        genres: filterGenres,
        platforms: filterPlatForms,
    }
    const validate = () => {
        if(game.name === '' || game.description === '' || game.released === '' || game.rating === '' || !obj.genres.length || !obj.platforms.length) {
            return "Falta Ingresar un campo"
        }
    }
    
    useEffect(() => {
        dispatch(getGenres())
    },[])
    
    const handleSudmit = (e) => {
        e.preventDefault()
        dispatch(createVideogame(obj))
        e.target.reset()
        alert("Videogame created successfully!");

        setGame({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: '',
            genres: [],
            platforms: [],
        })

    }


    return(
        <div className='create-container'>
            <h2 className='create-title' >Create Your VideoGame</h2>
            <form className='create-form' onSubmit={handleSudmit}>
                <div>
                    <div>
                        <label className='create-name'>Name: </label>
                        <input 
                            className='create-input'
                            type='text'
                            name='name'
                            value={game.name}
                            onChange={e => {
                                let expReg = /^[\s\S]{0,25}$/
                                if (expReg.test(e.target.value)) {
                                    setGame({
                                        ...game,
                                        name: e.target.value
                                    })     
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label className='create-name'>Description: </label>
                        <input 
                            className='create-input'
                            type='text'
                            name='description'
                            value={game.description}
                            onChange={e => {
                                let expReg = /^[\s\S]{0,1000}$/
                                if (expReg.test(e.target.value)) {
                                    setGame({
                                        ...game,
                                        description: e.target.value
                                    })     
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label className='create-name'>Released: </label>
                        <input 
                            className='create-input'
                            type='date'
                            name='released'
                            value={game.released}
                            onChange={e => {
                                setGame({
                                    ...game,
                                    released: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div>
                        <label className='create-name'>Rating between 0 and 5: </label>
                        <input 
                            className='create-input'
                            type='text'
                            name='rating'
                            value={game.rating}
                            onChange={e => {
                                let expReg = /^[0-5]+[\d,]{0,3}?$/
                                if (expReg.test(e.target.value)) {
                                    setGame({
                                        ...game,
                                        rating: e.target.value
                                    })     
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label className='create-name'>Image URL: </label>
                        <input 
                            className='create-input'
                            type='text'
                            name='rating'
                            placeholder='Campo opcional'
                            value={game.image}
                            onChange={e => {
                                setGame({
                                    ...game,
                                    image: e.target.value
                                })
                            }}
                        />
                    </div>
                </div>
                <div>
                    <label className='create-name-genre'>Genres </label>
                    <div className='create-list-genre'>
                        {
                            genres.map( gen => (
                                <div className='create-genres-container' key={gen.id}>
                                    <input
                                        className='create-genres-input'
                                        type='checkbox'
                                        name='genres'
                                        value={gen.name}
                                        onChange={ (e)  => {
                                            setGame({
                                                ...game,
                                                genres: [...game.genres, e.target.value]
                                            })
                                        }}
                                    />
                                    <label>{gen.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <label className='create-name'>Platforms </label>
                    <div className='create-list-platforms'>
                        {
                            allPlatforms.map( plat => (
                                <div key={plat}>
                                    <input
                                        className='create-platforms-input'
                                        type='checkbox'
                                        name='platforms'
                                        value={plat}
                                        onChange={ e => {
                                            setGame({
                                                ...game,
                                                platforms: [...game.platforms, e.target.value]
                                            })
                                        }}
                                    />
                                    <label>{plat}</label>  
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <button className='create-button' disabled={validate()} >Create!</button>
                    <p className='create-validate'>{validate()}</p>
                </div>
            </form>
        </div>
    )
}