const {Router} = require('express')
const router = Router()
const { allVideogames, allVideoGamesById, postVideoGame, updateVideoGames} = require('../controllers/getVideoGame')

router.get('/',allVideogames)
router.get('/:id',allVideoGamesById)
router.post('/',postVideoGame)
router.put('/:id', updateVideoGames)

module.exports = router