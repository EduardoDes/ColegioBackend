const {Router} = require('express');
const {check} = require('express-validator');
const {login , renewToken} = require('../controllers/authController');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const router = Router();

router.post('/',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login
)

router.get('/renew',[
    validarJWT
], renewToken)

module.exports = router;