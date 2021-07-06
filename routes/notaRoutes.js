const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getNotasByAlumno, crearNota} = require('../controllers/notasController');

const router = Router();

router.get('/:id', [

    validarJWT

] , getNotasByAlumno)

router.post('/', [

    validarJWT,
    check('alumno','El alumno es obligatorio').not().isEmpty(),
    check('asignatura','La asignatura es obligatoria').not().isEmpty(),
    check('profesor','El profesor es obligatorio').not().isEmpty(),
    check('nota','La nota es obligatoria').not().isEmpty(),
    check('nota','La nota debe ser un numero').isNumeric(),
    validarCampos
    
] , crearNota)

module.exports = router;
