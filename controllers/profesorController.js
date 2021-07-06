const {response} = require('express');
const Profesor = require('../models/profesorModel');


const getProfesores = async (req ,res = response) => {

    const profesores = await Profesor.find();

    res.status(200).json({ ok : true , profesores })

}

const getProfesorById = async (req ,res = response) => {

    const uid = req.params.id;
    
    try {

        const profesorExists = await Profesor.findById(uid)

        if(!profesorExists){
            return res.status(400).json({ ok : false , msg : 'El profesor con este id no existe'})
        }

        res.status(200).json({ ok : true , profesorExists})
        
    } catch (error) {

        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const crearProfesor = async (req , res = response) => {

    const currentDate = new Date();

    const {email} = req.body;

    try {

        const profesorExists = await Profesor.findOne({email});

        if(profesorExists){
            return res.status(400).json({ ok : false , msg : 'El correo ya esta registrado'})
        }

        const newProfesor = new Profesor({fechaIngreso : currentDate, ...req.body});

        await newProfesor.save()

        return res.json({ ok : true , profesor : newProfesor})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const actualizarUsuario = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const profesorDb = await Profesor.findById(uid);

        if(!profesorDb){
            return res.status(400).json({ ok : false , msg : 'No existe el profesor con este id'})
        }

        const { email , ...campos} = req.body;

        if(profesorDb.email != req.body.email){

            const existeEmail = await Profesor.findOne({email})
            if(existeEmail){
                return res.status(400).json({ ok : false , msg : 'Ya existe un profesor con este email'})
            }
        }

        campos.email = email

        const profesorActualizado = await Profesor.findByIdAndUpdate(uid ,campos , {new : true , useFindAndModify : false});

        res.json({ok : true , profesorActualizado});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
    }

}

const eliminarProfesor = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const profesorDb = await Profesor.findById(uid)

        if(!profesorDb){
            return res.status(400).json({ ok : false , msg : 'No existe profesor con este id'})
        }

        await Profesor.findByIdAndDelete(uid)

        res.status(200).json({ ok : true , msg : 'Profesor Eliminado'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado' })
        
    }
}


module.exports = {
    getProfesores,
    crearProfesor,
    getProfesorById,
    actualizarUsuario,
    eliminarProfesor
}