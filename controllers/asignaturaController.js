const {response} = require('express');
const Asignatura = require('../models/asignaturaModel');

const getAsignaturas = async (req , res = response) => {

    const asignaturas = await Asignatura.find();
    res.status(200).json({ ok : true , asignaturas})

}

const getAsignaturaById = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const asignaturaExists = await Asignatura.findById(uid)

        if(!asignaturaExists){
            return res.status(400).json({ ok : false , msg : 'La asignatura con este id no existe'})
        }

        res.status(200).json({ ok : true , asignaturaExists})
        
    } catch (error) {
        
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }
}

const crearAsignatura = async (req , res = response) => {

    const {nombre} = req.body;

    try {

        const asignaturaExists = await Asignatura.findOne({nombre});

        if(asignaturaExists){
            return res.status(400).json({ ok : false , msg : 'El nombre ya esta registrado'})
        }

        const newAsignatura = new Asignatura(req.body);

        await newAsignatura.save()

        return res.json({ ok : true , curso : newAsignatura})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}

module.exports = {

    getAsignaturas,
    getAsignaturaById,
    crearAsignatura
}