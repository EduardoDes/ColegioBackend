const { response } = require('express');
const Curso = require('../models/cursoModel');


const getCursos = async(req , res = response ) => {

    const cursos = await Curso.find();

    res.status(200).json({ ok : true , cursos})
}

const getCursoById = async(req , res = response) => {

    const uid = req.params.id;

    try {

        const cursoExists = await Curso.findById(uid)

        if(!cursoExists){
            return res.status(400).json({ ok : false , msg : 'El curso con este id no existe'})
        }

        res.status(200).json({ ok : true , cursoExists})
        
    } catch (error) {
        
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }
}

const crearCurso = async(req , res = response) => {

    const {nombre} = req.body;

    try {

        const cursoExits = await Curso.findOne({nombre});

        if(cursoExits){
            return res.status(400).json({ ok : false , msg : 'El nombre ya esta registrado'})
        }

        const newCurso = new Curso(req.body);

        await newCurso.save()

        return res.json({ ok : true , curso : newCurso})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }
}


module.exports = {

    getCursos,
    getCursoById,
    crearCurso

}