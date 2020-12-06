const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

//TODO Create User
const createUser = async (req, res = express.response) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'a user already has this email'
            })
        }

         user = new User(req.body)

        //encrypt
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

         await user.save()

        //TODO GENERAR JWT
        const token = await generateJWT(user.id, user.name)

        res.status(401).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }


}

//TODO Login
const loginUser = async (req, res = express.response) => {

    const { email, password } = req.body

    try{

        let user = await User.findOne({ email })

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'this user does not exist'
            })
        }

    //    confirm password
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'password incorrect'
            })
        }

    //    TODO JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }

}

const revalidateToken = async (req, res = express.response) => {

    const { uid,name } = req


    //    TODO GENERATE JWT
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}
