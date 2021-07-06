const {response} = require('express');
const Apoderado = require('../models/apoderadoModel');


const getApoderados = async (req , res = response) => {

    const apoderados = await Apoderado.find();

    res.status(200).json({ ok : true , apoderados })
}

const getApoderadoById = async (req , res = response) => {

    const uid = req.params.id;
    
    try {

        const apoderadoExists = await Apoderado.findById(uid)

        if(!apoderadoExists){
            return res.status(400).json({ ok : false , msg : 'El apoderado con este id no existe'})
        }

        res.status(200).json({ ok : true , apoderadoExists})
        
    } catch (error) {

        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const crearApoderado = async (req , res  = response) => {

    const currentDate = new Date();

    const {email} = req.body;

    try {

        const apoderadoExists = await Apoderado.findOne({email});

        if(apoderadoExists){
            return res.status(400).json({ ok : false , msg : 'El correo ya esta registrado'})
        }

        const newApoderado = new Apoderado({fechaIngreso : currentDate, ...req.body});

        await newApoderado.save()

        return res.json({ ok : true , profesor : newApoderado})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const actualizarApoderado = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const apoderadoDb = await Apoderado.findById(uid);

        if(!apoderadoDb){
            return res.status(400).json({ ok : false , msg : 'No existe el apoderado con este id'})
        }

        const { email , ...campos} = req.body;

        if(apoderadoDb.email != req.body.email){

            const existeEmail = await Apoderado.findOne({email})
            if(existeEmail){
                return res.status(400).json({ ok : false , msg : 'Ya existe un apoderado con este email'})
            }
        }

        campos.email = email

        const apoderadoActualizado = await Apoderado.findByIdAndUpdate(uid ,campos , {new : true , useFindAndModify : false});

        res.json({ok : true , apoderadoActualizado});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
    }
}

const eliminarApoderado = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const apoderadoDb = await Apoderado.findById(uid)

        if(!apoderadoDb){
            return res.status(400).json({ ok : false , msg : 'No existe apoderado con este id'})
        }

        await Apoderado.findByIdAndDelete(uid)

        res.status(200).json({ ok : true , msg : 'Apoderado Eliminado'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado' })
        
    }
}


module.exports = {

    getApoderados,
    getApoderadoById,
    crearApoderado,
    actualizarApoderado,
    eliminarApoderado
}