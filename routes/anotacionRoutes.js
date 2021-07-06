const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getAnotacionByAlumno , registrarAnotacion} = require('../controllers/anotacionController');

const router = Router();

router.get('/getAnotacionByAlumno/:id' , [

    validarJWT

] , getAnotacionByAlumno)

router.post('/', [

    validarJWT,
    check('alumno', 'El alumno es obligatorio').not().isEmpty(),
    check('asignatura', 'La asignatura es obligatoria').not().isEmpty(),
    check('profesor', 'El profesor es obligatorio').not().isEmpty(),
    check('anotacion', 'La anotacion es obligatoria').not().isEmpty(),
    validarCampos

] , registrarAnotacion)

module.exports = router;