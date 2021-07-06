const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const {getProfesores , crearProfesor , getProfesorById, actualizarUsuario, eliminarProfesor} = require('../controllers/profesorController');

const router = Router();

router.get('/', [

    validarJWT
    
], getProfesores)

router.get('/getProfesorById/:id', [

    validarJWT

], getProfesorById)

router.post('/', [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

], crearProfesor)

router.put('/:id', [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

], actualizarUsuario)

router.delete('/:id', [

    validarJWT

], eliminarProfesor)

module.exports = router;