const { Producto, Fabricante, Componente } = require('../models')
const productosController= {}
const mongoose = require('../db/server').mongoose;

const addProducto = async (req,res) => {
    const productoInf = req.body
    try{
        const producto = new Producto(productoInf)
        await producto.save()
        res.status(201).json({mensaje:'el producto fue agregado correctamente'})
    }catch{
        res.status(400).json('el servidor no puede procesar la solicitud')
    }
}
productosController.addProducto= addProducto

const getProductos = async (req,res) => {
    const productos = await Producto.find()
    res.status(200).json(productos)
}
productosController.getProductos = getProductos

const getProductoById = async (req,res) => {
    const id = req.params.id
    const producto = await Producto.findOne({
        where: {id},
        attributes: ['nombre','descripcion','precio']
    })
    res.status(200).json(producto)
}
productosController.getProductoById = getProductoById

const updateProducto = async (req,res) =>{
    const{nombre,descripcion,precio,pathImg} = req.body
    const id = req.params.id
    await Producto.update({ 
        nombre:nombre,
        descripcion:descripcion,
        pathImg:pathImg,
        precio:precio,
    },{where: {id}})
    res.status(200).json({mensaje:'el producto fue actualizado correctamente'})
}
productosController.updateProducto= updateProducto

const deleteProductoById = async (req,res) => {
    const id = req.params.id
    try{
        await Producto.destroy({where: {id}});
        res.status(200).json({mensaje:`el producto fue eliminado`})
    } catch{
        res.status(500).json({mensaje: `error al elimninar el producto`})
    } 
}
productosController.deleteProductoById = deleteProductoById

const fabricantesDelProductoConId= async (req, res) => {
    const id =  req.params.id;
    const producto = await Producto.findOne({
        where: {id},
        attributes: ['id','nombre','descripcion','precio','pathImg'],
        include: {
            model: Fabricante,
            attributes: ['id','nombre', 'direccion', 'numeroContacto', 'pathImgPerfil'],    
            through: {attributes:[]}
        }
    });
    res.status(200).json(producto)
}
productosController.fabricantesDelProductoConId= fabricantesDelProductoConId

const componentesDelProductoConId= async (req, res) => {
    const idProducto = req.modelo || await Producto.findById(req.params.id);
    const componentesDelProducto = await idProducto.populate({
        path: 'componentes',
        select: '-productos' 
    });

    idProducto.fabricantes = undefined
    
    res.status(200).json(componentesDelProducto)
}
productosController.componentesDelProductoConId= componentesDelProductoConId

module.exports = productosController