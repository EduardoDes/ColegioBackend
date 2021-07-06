const {response} = require('express');
const Nota = require('../models/notaModel');
const Alumno = require('../models/alumnoModel');
const Asignatura = require('../models/asignaturaModel');
const Profesor = require('../models/profesorModel');

const getNotasByAlumno = async( req , res = response) => {

    const alumno = req.params.id;

    try {

        
        let notaTotal = 0 ;
        const notaAlumnoExists = await Nota.find({alumno}).populate('asignatura','nombre')

        if(!notaAlumnoExists){
            return res.status(400).json({ ok : false , msg : 'No existen notas para el Alumno'})
        }

        let asignaturas = {};
        notaAlumnoExists.forEach(nota => {
            const asignatura = nota.asignatura.nombre;
            if(!asignaturas[asignatura]) asignaturas[asignatura] = [];
            asignaturas[asignatura].push(nota);

        });

        for( let objeto in asignaturas){

             notaTotal = 0 ;
            
            let notas = asignaturas[objeto]
      
            for (let nota in notas ){
               
               notaTotal = notas[nota].nota + notaTotal;
               
            }
            const promedio =  notaTotal/asignaturas[objeto].length;
            asignaturas[objeto].push({Promedio : promedio});
            
        }

       

        res.status(200).json({ ok : true , notas : asignaturas})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }

    

}

const crearNota = async ( req , res = response) => {

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

        const newNota = new Nota({fecha : currentDate, ...req.body})
        await newNota.save();

        res.status(200).json({ ok : true , newNota})
        
    } catch (error) {
        
        return res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }

}

module.exports = {

    getNotasByAlumno,
    crearNota
}