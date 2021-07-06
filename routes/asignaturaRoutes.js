const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getAsignaturas , getAsignaturaById , crearAsignatura} = require('../controllers/asignaturaController');

const router = Router();

router.get('/', [

    validarJWT

], getAsignaturas)

router.get('/getAsignaturaById/:id', [

    validarJWT

], getAsignaturaById)

router.post('/', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearAsignatura)

module.exports = router;
 