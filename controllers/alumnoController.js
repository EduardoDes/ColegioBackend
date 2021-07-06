const {response} = require('express');
const Alumno = require('../models/alumnoModel');
const Curso = require('../models/cursoModel');
const Apoderado = require('../models/apoderadoModel');

const getAlumnos = async( req , res = response) => {

    const alumnos = await Alumno.find().populate('curso','nombre')
                                       .populate('apoderado','nombre email');
    res.status(200).json({ ok : true , alumnos})
}

const getAlumnoById = async( req , res = response) => {

    uid = req.params.id;

    try {

        const alumnoExists = await Alumno.findById(uid).populate('curso','nombre')
                                                       .populate('apoderado','nombre email');

        if(!alumnoExists){
            return res.status(400).json({ ok : false , msg : 'El alumno con este id no existe'})
        }

        res.status(200).json({ ok : true , alumnoExists})
        
    } catch (error) {
        
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }
}

const crearAlumno = async( req , res = response) => {
    
    const currentDate = new Date();
    const curso = req.body.curso;
    const apoderado = req.body.apoderado;

    try {

        const cursoExists = await Curso.findById(curso);
        const apoderadoExists = await Apoderado.findById(apoderado);

        if(!cursoExists){

            return res.status(400).json({ ok : false , msg : 'El curso no existe'});

        }
        if(!apoderadoExists){

            return res.status(400).json({ ok : false , msg : 'El apoderado no existe'});

        }

        const createdAlumno = new Alumno({fechaIngreso : currentDate ,...req.body});

        await createdAlumno.save();

        res.status(200).json({ ok : true , createdAlumno})
        
    } catch (error) {

        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const actualizarAlumno = async(req , res = response) => {

    const uid = req.params.id;

    try {

        const alumnoDb = await Alumno.findById(uid);

        if(!alumnoDb){
            return res.status(400).json({ ok : false , msg : 'No existe el alumno con este id'})
        }

        const { email , ...campos} = req.body;

        if(alumnoDb.email != req.body.email){

            const existeEmail = await Alumno.findOne({email})
            if(existeEmail){
                return res.status(400).json({ ok : false , msg : 'Ya existe un alumno con este email'})
            }
        }

        campos.email = email

        const alumnoActualizado = await Alumno.findByIdAndUpdate(uid ,campos , {new : true , useFindAndModify : false});

        res.json({ok : true , alumnoActualizado});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
    }

}

const eliminarAlumno = async(req , res = response) =>{

    const uid = req.params.id;

    try {

        const alumnoDb = await Alumno.findById(uid)

        if(!alumnoDb){
            return res.status(400).json({ ok : false , msg : 'No existe alumno con este id'})
        }

        await Alumno.findByIdAndDelete(uid)

        res.status(200).json({ ok : true , msg : 'Alumno Eliminado'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado' })
        
    }
}

module.exports = {

    getAlumnos,
    getAlumnoById,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno

}

