const { Router } = require('express');
const { alterVideoGames } = require('../controllers/getVideoGame')

const router = Router();

router.get('/:id',alterVideoGames)

module.exports = router
