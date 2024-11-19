const { Router } = require('express')
const productoController = require('../controllers/producto.controller')
const {validarId} = require('../middelware/ValidarId')

const routes = Router()

routes.get('/', productoController.getProductos)
routes.get('/:id', validarId,productoController.getProductoById)
routes.post('/', productoController.addProducto)
routes.put('/:id', validarId,productoController.updateProducto)
routes.delete('/:id', validarId,productoController.deleteProductoById)
routes.get('/:id/fabricantes', validarId,productoController.fabricantesDelProductoConId)
routes.get('/:id/componentes', validarId, productoController.componentesDelProductoConId)

module.exports = routes