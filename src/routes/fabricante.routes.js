const { Router } = require('express')
const fabricanteController = require('../controllers/fabricante.controller')
const {validarId} = require('../middelware/ValidarId')

const routes = Router()

routes.get('/', fabricanteController.getFabricantes)
routes.get('/:id', validarId,fabricanteController.getFabricanteById)
routes.post('/', fabricanteController.addFabricante)
routes.put('/:id', validarId,fabricanteController.updateFabricante)
routes.delete('/:id', validarId,fabricanteController.deleteFabricanteById)
routes.get('/:id/productos', validarId,fabricanteController.productosDelFabricanteConId)

module.exports = routes