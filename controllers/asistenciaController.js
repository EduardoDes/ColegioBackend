const {response} = require('express');
const Asistencia = require('../models/asistenciaModel');
const Alumno = require('../models/alumnoModel');
const Asignatura = require('../models/asignaturaModel');
const Profesor = require('../models/profesorModel');

const getAsistenciaByAlumno = async(req , res = response) => {

    const alumno = req.params.id;
    
    
    try {

        let contadorAsistencia = 0 

        const asistenciaAlumnoExists = await Asistencia.find({alumno});

        if(!asistenciaAlumnoExists){

            return res.status(400).json({ ok : false , msg : 'No existen asistencias para el Alumno'})
        }

        asistenciaAlumnoExists.forEach(asistencia => {
            if(asistencia.asiste){
     
                contadorAsistencia++;
            }
        });


        const porcentajeAsistencia = (contadorAsistencia/asistenciaAlumnoExists.length)*100



        res.status(200).json({ ok : true , asistencia : asistenciaAlumnoExists , porcentajeAsistencia})
        
    } catch (error) {

        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

const registrarAsistencia = async(req , res = response) => {

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

        const newAsistencia = new Asistencia({fecha : currentDate, ...req.body})
        await newAsistencia.save();

        res.status(200).json({ ok : true , newAsistencia})
        
    } catch (error) {
        
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }

}

module.exports = {

    getAsistenciaByAlumno,
    registrarAsistencia

}