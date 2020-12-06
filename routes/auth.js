const { validateFields } = require('../middlewares/validateFields')
const { validateJWt } = require('../middlewares/validateJWT')
/*

Rutas de usuarios / Auth
host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router()
const { createUser, loginUser, revalidateToken } = require('../controllers/auth')

//Create User
router.post(
    '/new',
    [
    check('name','name required').not().isEmpty(),
    check('email','email required').isEmail(),
    check('password','password min 6 character').isLength({min: 6}),
        validateFields
    ],
    createUser)

//Login User
router.post(
    '/',
    [
        check('email','email required').isEmail(),
        check('password','password min 6 character').isLength({min: 6}),
        validateFields
    ],
    loginUser
)

//revalidate Token
router.get('/renew', validateJWt , revalidateToken)

module.exports = router
