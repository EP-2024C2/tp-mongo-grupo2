const { Fabricante, Producto, Componente } = require('../models');
const fabricantesController = {}
const mongoose = require('../db/server').mongoose;

const addFabricante = async (req, res) => {
    const fabricanteInf = req.body;
    try {
        const fabricante = new Fabricante(fabricanteInf)
        await fabricante.save()
        res.status(201).json({ mensaje: 'el fabricantes fue agregado correctamente' })
    } catch {
        res.status(400).json('el servidor no puede procesar la solicitud')
    }
}
fabricantesController.addFabricante = addFabricante

const getFabricantes = async (req, res) => {
    const fabricantes = await Fabricante.find()
    res.status(200).json(fabricantes)
}
fabricantesController.getFabricantes = getFabricantes

const getFabricanteById = async (req, res) => {
    const id = req.params.id
    try{
        const fabricante = await Fabricante.findById(id)
        res.status(200).json(fabricante)
    }catch(error){
        res.status(404).json({mensaje:`Error al obtener el fabricante ${error.mensaje}`});
    }
}
fabricantesController.getFabricanteById = getFabricanteById

const updateFabricante = async (req, res) => {
    try{
        const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
        const id = req.params.id
        const fabricanteAActualizar = await Fabricante.findById(id)
        await fabricanteAActualizar.updateOne({ nombre, direccion, numeroContacto, pathImgPerfil })
        res.status(200).json({ mensaje: 'el fabricante fue actualizado correctamente' })
    }catch(error){
        res.status(404).json({mensaje:`Error al actualizar el fabricante ${error.mensaje}`});
    }
}
fabricantesController.updateFabricante = updateFabricante
//falta no poder eliminar si tiene relacion
const deleteFabricanteById = async (req, res) => {
    const id = req.params.id;
    try {
        await Fabricante.findByIdAndDelete(id)
        res.status(200).json({ mensaje: `el fabricante fue eliminado de la lista de contactos` })
    } catch {
        return res.status(500).send('Ocurrio un error con el servidor')
    }
}

fabricantesController.deleteFabricanteById = deleteFabricanteById

const productosDelFabricanteConId = async (req, res) => {
    const id = req.params.id;
    const productosDelFabricante = await Fabricante.findById(id).populate({
        path: "productos",
        select: "-fabricantes",
        populate: {
            path: "componentes",
            select: "-productos",
        }
    })
    res.status(200).json(productosDelFabricante)
}
fabricantesController.productosDelFabricanteConId = productosDelFabricanteConId

module.exports = fabricantesController