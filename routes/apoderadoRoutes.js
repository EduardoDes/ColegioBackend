const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const {getApoderados , getApoderadoById , crearApoderado , actualizarApoderado , eliminarApoderado} = require('../controllers/apoderadoController');

const router = Router();

router.get('/', [

    validarJWT

], getApoderados)

router.get('/getApoderadoById/:id', [

    validarJWT

], getApoderadoById)

router.post('/', [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

] , crearApoderado)

router.put('/:id', [

    validarJWT

], actualizarApoderado)

router.delete('/:id', [

    validarJWT

], eliminarApoderado)


module.exports = router ;