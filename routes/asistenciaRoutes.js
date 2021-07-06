const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getAsistenciaByAlumno , registrarAsistencia} = require('../controllers/asistenciaController');

const router = Router();

router.get('/getAsistenciaByAlumno/:id' , [

    validarJWT

] , getAsistenciaByAlumno)

router.post('/' , [

    validarJWT,
    check('alumno', 'El alumno es obligatorio').not().isEmpty(),
    check('asignatura', 'La asignatura es obligatoria').not().isEmpty(),
    check('profesor', 'El profesor es obligatorio').not().isEmpty(),
    validarCampos

] , registrarAsistencia)

module.exports = router;