const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getAlumnos , getAlumnoById , crearAlumno, actualizarAlumno, eliminarAlumno} = require('../controllers/alumnoController');

const router = Router();

router.get('/', [

    validarJWT

] , getAlumnos)

router.get('/getAlumnoById/:id', [

    validarJWT

] , getAlumnoById)

router.post('/' , [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('curso','El curso es obligatorio').not().isEmpty(),
    check('apoderado','El apoderado es obligatorio').not().isEmpty(),
    validarCampos

] , crearAlumno)

router.put('/:id' , [

    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

] , actualizarAlumno)

router.delete('/:id' , [

    validarJWT,
    
] , eliminarAlumno)

module.exports = router;