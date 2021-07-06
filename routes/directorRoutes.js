const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const {getDirectores , crearDirector , actualizarUsuario , eliminarDirector} = require('../controllers/directorController');

const router = Router();

router.get('/', getDirectores);

router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

],crearDirector)

router.put('/:id', [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

],actualizarUsuario)

router.delete('/:id', validarJWT , eliminarDirector)

module.exports = router;

