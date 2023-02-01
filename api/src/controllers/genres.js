require('dotenv').config()
const axios = require('axios')
const { API_KEY} = process.env
const { Genre} = require('../db')

const apiVideoGameGenres = async () => {
    return await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) 
    .then(response => {
        const {data} = response
        const dataApi = data.results.map(gender => {
            return {
                id: gender.id,
                name: gender.name
            }
        })
        return dataApi
    })
}

const allGenres = async (req, res) => {
    
    let dbGenre = await Genre.findAll()

    if(dbGenre.length === 0) {
        const apiGameGenders = await apiVideoGameGenres()
        await Genre.bulkCreate(apiGameGenders)
    }
    res.send(dbGenre)
} 

module.exports = {allGenres}