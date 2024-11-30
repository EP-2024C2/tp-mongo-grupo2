const { Producto, Fabricante, Componente } = require('../models')
const productosController = {}
const mongoose = require('../db/server').mongoose;

const addProducto = async (req, res) => {
    const productoInf = req.body
    try {
        const producto = new Producto(productoInf)
        await producto.save()
        res.status(201).json({ mensaje: 'el producto fue agregado correctamente' })
    } catch {
        res.status(400).json('el servidor no puede procesar la solicitud')
    }
}
productosController.addProducto = addProducto
//funciona no subido
const getProductos = async (req, res) => {
    const productos = await Producto.find()
    res.status(200).json(productos)
}
productosController.getProductos = getProductos
//funciona no subido
const getProductoById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findById(id)
    res.status(200).json(producto)
}
productosController.getProductoById = getProductoById
//funciona no subido
const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const id = req.params.id
    const producto = await Producto.findById(id)
    await producto.updateOne({ nombre, descripcion, precio, pathImg })
    res.status(200).json({ mensaje: 'el producto fue actualizado correctamente' })
}
productosController.updateProducto = updateProducto
/*
const associateProductoConFabricantes = async (req, res) => {

}
productosController.associateProductoConFabricantes = associateProductoConFabricantes */
//funciona a medias, falta no poder eliminar si tiene relacion
const deleteProductoById = async (req, res) => {
    const id = req.params.id
    try {
        await Producto.find(id);
        res.status(200).json({ mensaje: `el producto fue eliminado` })
    } catch {
        res.status(500).json({ mensaje: `error al elimninar el producto` })
    }
}
productosController.deleteProductoById = deleteProductoById
/*
const associateProductoConComponentes = async (req, res) => {

}
productosController.associateProductoConComponentes = associateProductoConComponentes*/
//funciona no subido
const fabricantesDelProductoConId = async (req, res) => {
    const id = req.params.id;
    const producto = await Producto.findById(id).populate('fabricantes')
    res.status(200).json(producto.fabricantes)
}
productosController.fabricantesDelProductoConId = fabricantesDelProductoConId
//funciona no subido
const componentesDelProductoConId = async (req, res) => {
    const id = req.params.id;
    const producto = await Producto.findById(id).populate('componentes')
    res.status(200).json(producto.componentes)
}
productosController.componentesDelProductoConId = componentesDelProductoConId

module.exports = productosController