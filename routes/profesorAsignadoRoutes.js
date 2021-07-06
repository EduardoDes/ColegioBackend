const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getProfesoresAsignados, getAsignaturaByProfesor, asignarAsignatura} = require('../controllers/profesorAsignadoController');

const router = Router();

router.get('/', [

    validarJWT

], getProfesoresAsignados)

router.get('/getAsignaturaByProfesor/:id' , [

    validarJWT

] , getAsignaturaByProfesor)

router.post('/', [

    validarJWT,
    check('profesor', 'El profesor es obligatorio').not().isEmpty(),
    check('asignatura', 'La asignatura es obligatoria').not().isEmpty(),
    validarCampos

] , asignarAsignatura)

module.exports = router;