const {response} = require('express');
const Anuncio = require('../models/anuncioModel');

const getAnuncios = async(req , res = response) => {

    const anuncios = await Anuncio.find();
    res.status(200).json({ ok : true , anuncios})
}

const getAnuncioById = async(req , res = response) => {

    uid = req.params.id

    try {

        const anuncioExits = await Anuncio.findById(uid)

        if(!anuncioExits){
            return res.status(400).json({ ok : false , msg : 'El anuncio con este id no existe'})
        }

        res.status(200).json({ ok : true , anuncioExits})
        
    } catch (error) {
        
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})

    }
}

const crearAnuncio = async(req , res = response) => {

    try {

        const newAnuncio = new Anuncio(req.body);

        await newAnuncio.save()

        return res.json({ ok : true , anuncio : newAnuncio})

        
    } catch (error) {
        
        res.status(500).json({ ok : false , msg : 'Error Inesperado'})
        
    }

}

module.exports = {
    getAnuncios,
    getAnuncioById,
    crearAnuncio
}