const { Router } = require('express')
const productoController = require('../controllers/producto.controller')

const routes = Router()

routes.get('/', productoController.getProductos)
routes.get('/:id', productoController.getProductoById)
routes.post('/', productoController.addProducto)
routes.put('/:id', productoController.updateProducto)
routes.delete('/:id', productoController.deleteProductoById)
routes.get('/:id/fabricantes', productoController.fabricantesDelProductoConId)
routes.get('/:id/componentes', productoController.componentesDelProductoConId)

module.exports = routes