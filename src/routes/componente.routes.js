const { Router } = require('express')
const componenteController = require('../controllers/componente.controller')
const {validarId} = require('../middelware/ValidarId')

const routes = Router()

routes.get('/', componenteController.getComponentes)
routes.get('/:id', validarId,componenteController.getComponenteById)
routes.post('/', componenteController.addComponente)
routes.put('/:id', validarId,componenteController.updateComponente)
routes.delete('/:id', validarId,componenteController.deleteComponenteById)
routes.get('/:id/productos', validarId,componenteController.componentesDelProductoConId)

module.exports = routes