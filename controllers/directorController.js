const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Director = require('../models/directorModel');


const getDirectores = async (req , res = response) => {

  
    const directores = await Director.find();

    res.json({ok: true , directores})


}

const crearDirector = async(req, res = response) => {

    const {email , password} = req.body;

    try {

    const emailExists = await Director.findOne({email});
    
    if(emailExists){
        return res.status(400).json({ok:false ,msg:'El correo ya esta registrado'});
    }

    const director = new Director(req.body);

    //Encriptar Contraseña

    const salt = bcryptjs.genSaltSync();
    director.password = bcryptjs.hashSync(password,salt);

  

    await director.save();

    const token = await generarJWT(director.id);

    res.json({ok : true , director, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok : false, msg:'Error Inesperado'});
    }
}

const actualizarUsuario = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const directorDb = await Director.findById(uid);

        if(!directorDb){
            return res.status(400).json({ ok : false , msg : 'No existe el usuario con este id'})
        }

        const {password , email , ...campos} = req.body;

        if(directorDb.email != req.body.email){

            const existeEmail = await Director.findOne({email})
            if(existeEmail){
                return res.status(400).json({ ok : false , msg : 'Ya existe un usuario con este email'})
            }
        }

        campos.email = email

        const directorActualizado = await Director.findByIdAndUpdate(uid ,campos , {new : true , useFindAndModify : false});

        res.json({ok : true , directorActualizado});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
    }
}

const eliminarDirector = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const directorDb = await Director.findById(uid)

        if(!directorDb){
            return res.status(400).json({ ok : false , msg : 'No existe director con este id'})
        }

        await Director.findByIdAndDelete(uid)

        res.status(200).json({ ok : true , msg : 'Director Eliminado'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado' })
        
    }
}


module.exports = {
    getDirectores,
    crearDirector,
    actualizarUsuario,
    eliminarDirector
}