const {response} = require('express');
const Director = require('../models/directorModel');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const login = async (req , res = response) => {

    const {email , password} = req.body;

    try {

        const directorDb = await Director.findOne({email});

        if(!directorDb){
          return  res.status(404).json({ok : false , msg : 'Email no encontrado'})
        }

        const validPassword = bcryptjs.compareSync(password , directorDb.password)

        if(!validPassword){
         return  res.status(404).json({ok : false , msg : 'Contraseña no valida'})
        }

        const token = await generarJWT(directorDb.id)

        return  res.status(200).json({ ok : true , token})
        
    } catch (error) {

        return  res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    } 
}

const renewToken = async (req , res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({ ok : true , token})
}

module.exports = {

    login,
    renewToken
}