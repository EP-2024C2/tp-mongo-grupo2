const Joi = require('joi')

const fabricanteSchema = Joi.object().keys(
    {
    nombre: Joi.string().min(3).max(64).required().messages({
        "any.required":"nombre es requerido",
        "string.min": "nombre debe tener como mínimo {#limit} caracteres",
        "string.max": "nombre debe tener como máximo {#limit} caracteres",
        "string.empty": "nombre no puede ser vacio"
    }),
    direccion: Joi.string().min(3).max(64).required().messages({
        "any.required":"direccion es requerido",
        "string.min": "direccion debe tener como mínimo {#limit} caracteres",
        "string.max": "direccion debe tener como máximo {#limit} caracteres",
        "string.empty": "direccion no puede ser vacio"
    }),
    numeroContacto: Joi.string().min(3).max(64).required().messages({
        "any.required":"numero de contacto es requerido",
        "string.min": "numero de contacto debe tener como mínimo {#limit} caracteres",
        "string.max": "numero de contacto debe tener como máximo {#limit} caracteres",
        "string.empty": "numero de contacto no puede ser vacio"
    }),
    pathImgPerfil: Joi.string().default('/images/fabricante/fondo_blanco.jpg')

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = fabricanteSchema