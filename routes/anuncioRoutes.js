const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getAnuncios , getAnuncioById , crearAnuncio} = require('../controllers/anuncioController');

const router = Router();

router.get('/', [

    validarJWT

], getAnuncios)

router.get('/getAnuncioById/:id', [

    validarJWT

], getAnuncioById)

router.post('/', [

    validarJWT,
    check('anuncio', 'El anuncio es obligatorio').not().isEmpty(),
    validarCampos

], crearAnuncio)


module.exports = router