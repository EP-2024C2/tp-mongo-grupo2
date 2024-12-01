const { Router } = require('express')
const componenteController = require('../controllers/componente.controllers')
const { validarId } = require('../middelware/ValidarId')
const { Componente } = require('../models')
const schemasValidador = require('../middelware/schemasValidador')
const componenteSchema = require('../schemas/componente.schema')

const routes = Router()

routes.get('/', componenteController.getComponentes)
routes.get('/:id', validarId(Componente), componenteController.getComponenteById)
routes.post('/',schemasValidador(componenteSchema), componenteController.addComponente)
routes.put('/:id', validarId(Componente), componenteController.updateComponente)
routes.delete('/:id', validarId(Componente), componenteController.deleteComponenteById)
routes.get('/:id/productos', validarId(Componente), componenteController.productosDelComponenteConId)

module.exports = routes
