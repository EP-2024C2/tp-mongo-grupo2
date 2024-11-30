const { Fabricante, Producto, Componente } = require('../models')
const fabricantesController = {}
const mongoose = require('../db/server').mongoose;

const addFabricante = async (req, res) => {
    const fabricanteInf = req.body;
    try {
        const fabricante = new Fabricante(fabricanteInf)
        await fabricante.save()
        res.status(201).json({mensaje:'el fabricantes fue agregado correctamente'})
    }catch{
        res.status(400).json('el servidor no puede procesar la solicitud')
    }
}
fabricantesController.addFabricante = addFabricante
//funciona
const getFabricantes = async (req, res) => {
    const fabricantes = await Fabricante.find()
    res.status(200).json(fabricantes)
}
fabricantesController.getFabricantes = getFabricantes
//funciona no subido
const getFabricanteById = async (req, res) => {
    const id = req.params.id
    const fabricante = await Fabricante.findById(id)
    res.status(200).json(fabricante)
}
fabricantesController.getFabricanteById = getFabricanteById
//funciona no subido
const updateFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    const id = req.params.id
    const fabricante = await Fabricante.findById(id)
    await fabricante.updateOne({ nombre, direccion, numeroContacto, pathImgPerfil })
    res.status(200).json({mensaje:'el fabricante fue actualizado correctamente'})
}
fabricantesController.updateFabricante = updateFabricante
//funciona a medias, falta no poder eliminar si tiene relacion
const deleteFabricanteById = async (req, res) => {
    const id = req.params.id;
    try{
        await Fabricante.findByIdAndDelete(id)
        res.status(200).json({ mensaje: `el fabricante fue eliminado de la lista de contactos` })
    }catch{
        return res.status(500).send('Ocurrio un error con el servidor')
    }
}

fabricantesController.deleteFabricanteById = deleteFabricanteById
//funciona no subido
const productosDelFabricanteConId= async (req, res) => {
    //const fabricante = req.modelo || await Fabricante.findById(req.params.id);
    //const productosDelFabricante = await fabricante.populate('productos');
    // res.status(200).json(productosDelFabricante)
    const id = req.params.id;
    const fabricante = await Fabricante.findById(id).populate('productos')
    res.status(200).json(fabricante.productos)
}
fabricantesController.productosDelFabricanteConId= productosDelFabricanteConId

module.exports = fabricantesController