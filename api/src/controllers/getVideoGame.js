require('dotenv').config()
const axios = require('axios')
const { API_KEY} = process.env
const { Videogame, Genre} = require('../db')

const apiVideoGames = async () => {
    let allGames = []
    for (let i = 1; i <= 3; i++) {
        let games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&page_size=35`)
        let dataApi = games.data.results.map( game => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                genres: game.genres?.map(g => g.name).join(', '),
                }
        })
        allGames.push(...dataApi)
    }
    return allGames
}

const apiVideoGamesByName = async (name) => {
    return await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`) 
    .then(response => {
        const {data} = response
        const dataApi = data.results.map(game => {
            return{
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                released: game.released,
                genres: game.genres?.map(g => g.name).join(', '),
                platforms: data.platforms?.map(p => p.platform.name).join(', ')
            }
        })
        return dataApi
    })
}

const apiVideoGamesById = async (id) => {
    return await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`) 
    .then(response => {
        const {data} = response
            return{
                id: data.id,
                name: data.name,
                image: data.background_image,
                rating: data.rating,
                description: data.description_raw,
                released: data.released,
                genres: data.genres?.map(g => g.name).join(', '),
                platforms: data.platforms?.map(p => p.platform.name).join(', ')
            }
        })
    }

const allVideogames = async (req, res) => {
    const { name } = req.query

    try {
        if(name) {
            const apiGameByName = await apiVideoGamesByName(name)
            const dbGameByName = await Videogame.findOne({where: {name: name}, include:[Genre]})

            if(dbGameByName) {
                const probando = [{
                    id: dbGameByName.id,
                    name: dbGameByName.name,
                    image: dbGameByName.image,
                    rating: dbGameByName.rating,
                    released: dbGameByName.released,
                    genres: dbGameByName.genres.map( e => e.name).join(', '),
                    platform: dbGameByName.platforms
                }]
                const allGamesByName = [...probando, ...apiGameByName]
                allGamesByName.length ? res.send(allGamesByName) : res.status(404).send('Not Found By Name')
            }else{
                const apiGameByName = await apiVideoGamesByName(name)
                apiGameByName.length ? res.send(apiGameByName) : res.status(404).send('Not Found By Name')
            }
        }
        else {
            const dataApi = await apiVideoGames()
            const dbGames = await Videogame.findAll({include: Genre})
            let jsonGames = dbGames.map((J) => J.toJSON())
            jsonGames.forEach(C => {
              C.source = "Created", 
              C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
            });
            const allGames = [...jsonGames, ...dataApi]
            allGames.sort((a,b) => a.name.length < b.name.length)
            allGames.length ? res.send(allGames) : res.status(404).send('Not Found AllGames')  
        }
    } catch (error) {
        
    }
}

const allVideoGamesById = async (req, res) => {
    const { id } = req.params

    try {
        if(id.includes('-')){
            const dbGameById = await Videogame.findOne({where: {id: id}, include: [Genre]})
            const probando = {
                id: dbGameById.id,
                name: dbGameById.name,
                image: dbGameById.image,
                rating: dbGameById.rating,
                released: dbGameById.released,
                genres: dbGameById.genres.map( e => e.name).join(', '),
                platforms: dbGameById.platforms,
                description: dbGameById.description,
            }
            res.send(probando)
        }else{

            const apiGamesById = await apiVideoGamesById(id)
            res.send(apiGamesById)
        }
    } catch (error) {
        res.status(404).send({error: 'ID Not Found'})
    }
}

const postVideoGame = async (req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body

    let platformString = platforms.join(', ')

    const gameCreate = await Videogame.create({
        name,
        description,
        image,
        released,
        rating,
        platforms: platformString
    })

    genres.forEach( async (g) => {
        let genrenGame = await Genre.findOne({where: {name: g}})
        await gameCreate.addGenre(genrenGame)
    })

    res.send('videoGame created Successfully!')
}

const alterVideoGames = async (req, res) => {
    let {id} = req.params
    let newVideogame = await apiVideoGamesById(id)
    let otherVideoGame = {
        name: newVideogame.name,
        rating: newVideogame.rating
    }
    res.send(otherVideoGame)
    
}

const updateVideoGames = async (req, res) => {
    const { id } = req.params
    const { name, description, image, released, rating, platforms, genres } = req.body
    console.log(id)
    const game = await Videogame.findByPk(id)
    console.log(game)
    res.send('updateVideoGame')
}


module.exports = { allVideogames, allVideoGamesById, postVideoGame, alterVideoGames, updateVideoGames }
