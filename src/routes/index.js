const { Router } = require('express')
const productoRoutes = require('./producto.routes')
const fabricanteController = require('./fabricante.routes')
const componenteController = require('./componente.routes')
const router = Router()

router.use('/productos', productoRoutes)
router.use('/fabricantes', fabricanteController)
router.use('/componentes', componenteController)
module.exports = router