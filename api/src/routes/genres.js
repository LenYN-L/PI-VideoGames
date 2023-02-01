const {Router} = require('express')
const router = Router()
const { allGenres } = require('../controllers/genres')

router.get('/',allGenres)

module.exports = router