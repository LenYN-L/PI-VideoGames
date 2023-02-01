const { Router } = require('express');
// Importar todos los routers;
const videogame = require('./videogame')
const genres = require('./genres')
const alterVideogame = require('./alterVideoGames')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame',videogame)
router.use('/genres', genres)
router.use('/alterVideogame', alterVideogame)


module.exports = router;
