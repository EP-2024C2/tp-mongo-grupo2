const { Router } = require('express')
const productoController = require('../controllers/producto.controllers')
const { validarId } = require('../middelware/ValidarId')
const Producto = require('../models')
const schemasValidador = require('../middelware/schemasValidador')
const productoSchema = require('../schemas/producto.schema')


const routes = Router()

routes.get('/', productoController.getProductos)
routes.get('/:id', validarId(Producto), productoController.getProductoById)
routes.post('/',schemasValidador(productoSchema), productoController.addProducto)
routes.put('/:id', validarId(Producto), productoController.updateProducto)
routes.delete('/:id', validarId(Producto), productoController.deleteProductoById)
routes.post('/:id/fabricantes', validarId(Producto), productoController.associateProductoConFabricantes)
routes.get('/:id/fabricantes', validarId(Producto), productoController.fabricantesDelProductoConId)
routes.post('/:id/componentes', validarId(Producto), productoController.associateProductoConComponentes)
routes.get('/:id/componentes', validarId(Producto), productoController.componentesDelProductoConId)

module.exports = routes
