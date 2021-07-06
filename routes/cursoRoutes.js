const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const {getCursos , getCursoById , crearCurso } = require('../controllers/cursoController');

const router = Router();

router.get('/', [

    validarJWT

] , getCursos)

router.get('/getCursoById/:id', [

    validarJWT

] , getCursoById)

router.post('/', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

] , crearCurso)

module.exports = router;