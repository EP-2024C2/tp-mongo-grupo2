const { Router } = require('express')
const productoController = require('../controllers/producto.controllers')
const { validarId } = require('../middelware/ValidarId')
const { Producto } = require('../models')

const routes = Router()

routes.get('/', productoController.getProductos)
routes.get('/:id', validarId(Producto), productoController.getProductoById)
routes.post('/', productoController.addProducto)
routes.put('/:id', validarId(Producto), productoController.updateProducto)
routes.delete('/:id', validarId(Producto), productoController.deleteProductoById)
//routes.post('/productos/:id/fabricantes', validarId(Producto), productoController.associateProductoConFabricantes)
routes.get('/:id/fabricantes', validarId(Producto), productoController.fabricantesDelProductoConId)
//routes.post('/productos/:id/componentes', validarId(Producto), productoController.associateProductoConComponentes)
routes.get('/:id/componentes', validarId(Producto), productoController.componentesDelProductoConId)

module.exports = routes