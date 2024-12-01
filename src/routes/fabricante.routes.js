const { Router } = require('express')
const fabricanteController = require('../controllers/fabricante.controllers')
const { validarId } = require('../middelware/ValidarId')
const { Fabricante } = require('../models')
const schemasValidador = require('../middelware/schemasValidador')
const fabricanteSchema = require('../schemas/fabricante.schema')

const routes = Router()

routes.get('/', fabricanteController.getFabricantes)
routes.get('/:id', validarId(Fabricante), fabricanteController.getFabricanteById)
routes.post('/', schemasValidador(fabricanteSchema), fabricanteController.addFabricante)
routes.put('/:id', validarId(Fabricante), fabricanteController.updateFabricante)
routes.delete('/:id', validarId(Fabricante), fabricanteController.deleteFabricanteById)
routes.get('/:id/productos', validarId(Fabricante), fabricanteController.productosDelFabricanteConId)

module.exports = routes
