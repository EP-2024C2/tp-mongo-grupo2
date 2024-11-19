const { Router } = require('express')
const fabricanteController = require('../controllers/fabricante.controller')

const routes = Router()

routes.get('/', fabricanteController.getFabricantes)
routes.get('/:id', fabricanteController.getFabricanteById)
routes.post('/', fabricanteController.addFabricante)
routes.put('/:id', fabricanteController.updateFabricante)
routes.delete('/:id', fabricanteController.deleteFabricanteById)
routes.get('/:id/productos', fabricanteController.productosDelFabricanteConId)

module.exports = routes