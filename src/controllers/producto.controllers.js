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

const getProductos = async (req, res) => {
    const productos = await Producto.find()
    res.status(200).json(productos)
}
productosController.getProductos = getProductos

const getProductoById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findById(id)
    res.status(200).json(producto)
}
productosController.getProductoById = getProductoById

const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const id = req.params.id
    const productoAActualizar = await Producto.findById(id)
    await productoAActualizar.updateOne({ nombre, descripcion, precio, pathImg })
    res.status(200).json({ mensaje: 'el producto fue actualizado correctamente' })
}
productosController.updateProducto = updateProducto
/*
const associateProductoConFabricantes = async (req, res) => {
  
}
productosController.associateProductoConFabricantes = associateProductoConFabricantes */
//falta no poder eliminar si tiene relacion
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
//routes.post('/productos/:id/componentes 
/*
const associateProductoConComponentes = async (req, res) => {

}
productosController.associateProductoConComponentes = associateProductoConComponentes*/

const fabricantesDelProductoConId = async (req, res) => {
    const id = req.params.id;
    const fabricantesDelProducto = await Producto.findById(id).select("-componentes").populate({
        path: "fabricantes", select: "-productos"
    })
    res.status(200).json(fabricantesDelProducto)
}
productosController.fabricantesDelProductoConId = fabricantesDelProductoConId

const componentesDelProductoConId = async (req, res) => {
    const id = req.params.id;
    const componentesDelProducto = await Producto.findById(id).select("-fabricantes").populate({
        path: "componentes",
        select: "-productos"
    })
    res.status(200).json(componentesDelProducto)
}
productosController.componentesDelProductoConId = componentesDelProductoConId

module.exports = productosController