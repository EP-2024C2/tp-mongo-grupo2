const { Fabricante, Producto, Componente } = require('../models')
const componenteController = {}
const mongoose = require('../db/server').mongoose;


const addComponente = async (req, res) => {
    const componenteInf = req.body
    try {
        const componente = new Componente(componenteInf)
        await componente.save()
        res.status(201).json({ mensaje: 'el componente fue agregado correctamente' })
    } catch {
        res.status(400).json('el servidor no puede procesar la solicitud')
    }
}
componenteController.addComponente = addComponente

const getComponentes = async (req, res) => {
    const componentes = await Componente.find()
    res.status(200).json(componentes)
}
componenteController.getComponentes = getComponentes

const getComponenteById = async (req, res) => {
    const id = req.params.id
    const componente = await Componente.findById(id)
    res.status(200).json(componente)
}
componenteController.getComponenteById = getComponenteById

const updateComponente = async (req, res) => {
    const { nombre, descripcion } = req.body
    const id = req.params.id
    const componenteAActualizar = await Componente.findById(id)
    await componenteAActualizar.updateOne({ nombre, descripcion })
    res.status(200).json({ mensaje: 'el componente fue actualizado correctamente' })
}
componenteController.updateComponente = updateComponente
//falta no poder eliminar si tiene relacion
const deleteComponenteById = async (req, res) => {
    const id = req.params.id
    try {
        await Componente.findByIdAndDelete(id)
        res.json({ mensaje: `el componente fue eliminado` })
    } catch {
        res.status(500).json({ mensaje: `error al elimninar el componente` })
    }
}
componenteController.deleteComponenteById = deleteComponenteById

const productosDelComponenteConId = async (req, res) => {
    const id = req.params.id;
    const productosDelComponente = await Componente.findById(id).populate({
        path: "productos",
        select: "-componentes",
        populate: {
            path: "fabricantes",
            select: "-productos",
        }

    })
    res.status(200).json(productosDelComponente)
}
componenteController.productosDelComponenteConId = productosDelComponenteConId

module.exports = componenteController