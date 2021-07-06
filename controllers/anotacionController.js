const {response} = require('express');
const Anotacion = require('../models/anotacionModel');
const Alumno = require('../models/alumnoModel');
const Asignatura = require('../models/asignaturaModel');
const Profesor = require('../models/profesorModel');

const getAnotacionByAlumno = async(req , res = response) => {

    const alumno = req.params.id;

    try {

        const anotacionAlumnoExists = await Anotacion.find({alumno});

        if(!anotacionAlumnoExists){

            return res.status(400).json({ ok : false , msg : 'No existen anotaciones para el Alumno'})
        }

        res.status(200).json({ ok : true , anotaciones : anotacionAlumnoExists})
        
    } catch (error) {

        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const registrarAnotacion = async( req , res = response) => {

    const currentDate = new Date();
    const alumno = req.body.alumno;
    const asignatura = req.body.asignatura;
    const profesor = req.body.profesor;

    try {

        const alumnoExists = await Alumno.findById(alumno);

        if(!alumnoExists){

            return res.status(400).json({ ok : false , msg : 'El alumno no existe'})
        }

        const asignaturaExists = await Asignatura.findById(asignatura);
        
        if(!asignaturaExists){

            return res.status(400).json({ ok : false , msg : 'La asignatura no existe'})
        }

        const profesorExists = await Profesor.findById(profesor);
        
        if(!profesorExists){

            return res.status(400).json({ ok : false , msg : 'El profesor no existe'})
        }

        const newAnotacion = new Anotacion({fecha : currentDate, ...req.body})
        await newAnotacion.save();

        res.status(200).json({ ok : true , newAnotacion})
        
    } catch (error) {
        
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }
}

module.exports = {

    getAnotacionByAlumno,
    registrarAnotacion
}