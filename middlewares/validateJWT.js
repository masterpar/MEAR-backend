const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {

    //x-token headers
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'there is no token in the request'
        })
    }

    try{

        const  { uid, name }= jwt.verify(
            token,
            process.env.SECRET_JWT
        )

        req.uid = uid
        req.name = name

    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'token not valid'
        })
    }

    next()

};

module.exports = {
    validateJWt: validateJWT
}
