const Joi = require('joi')

const componenteSchema = Joi.object().keys(
    {
    nombre: Joi.string().min(3).max(64).required().messages({
        "any.required":"nombre es requerido",
        "string.min": "nombre debe tener como mínimo {#limit} caracteres",
        "string.max": "nombre debe tener como máximo {#limit} caracteres",
        "string.empty": "nombre no puede ser vacio"
    }),
    descripcion: Joi.string().max(255).required().default('Sin descripcion').messages({
        "any.required":"descripcion es requerida",
        "string.max": "nombre debe tener como máximo {#limit} caracteres"
    })
}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = componenteSchema
