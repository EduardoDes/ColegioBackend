const {response} = require('express');
const ProfesorAsignado = require('../models/profesorAsignadoModel');
const Asignatura = require('../models/asignaturaModel');
const Profesor = require('../models/profesorModel');


const getProfesoresAsignados = async (req , res = response) => {

    const profesoresAsignados = await ProfesorAsignado.find().populate('profesor','nombre')
                                                             .populate('asignatura', 'nombre');

    res.status(200).json({ ok : true , profesoresAsignados})                                                         

}

const getAsignaturaByProfesor = async(req , res = response) => {

    profesor = req.params.id

    try {

        const asignaturaAsigExists = await ProfesorAsignado.find({profesor}).populate('asignatura', 'nombre');

        if(!asignaturaAsigExists){

            return res.status(400).json({ ok : false , msg : 'El profesor no tiene asignado asignaturas'})
        }

        res.json({ ok : true , asignadas : asignaturaAsigExists})
        
    } catch (error) {

        return res.status(400).json({ ok : false , msg : 'Error Inesperado'})
    }
}

const asignarAsignatura = async(req , res = response) => {

    const asignatura = req.body.asignatura;
    const profesor = req.body.profesor;

    try {

        const asignaturaExists = await Asignatura.findById(asignatura);
        const profesorExists = await Profesor.findById(profesor);

        if(!asignaturaExists){

            return res.status(400).json({ ok : false , msg : 'La asignatura no existe'});

        }
        if(!profesorExists){

            return res.status(400).json({ ok : false , msg : 'El profesor no existe'});

        }

        const asignacion = new ProfesorAsignado(req.body);

        await asignacion.save();

        res.status(200).json({ ok : true , asignacion})
        
    } catch (error) {

        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}


module.exports = {

    getProfesoresAsignados,
    getAsignaturaByProfesor,
    asignarAsignatura
}