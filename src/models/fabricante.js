const mongoose = require('mongoose')
const { Schema } = require('mongoose');
//const mongoose = require('./db').mongoose;

const fabricantesSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    direccion: {
        type: Schema.Types.String,
        required: true
    },
    numeroContacto: {
        type: Schema.Types.String,
        required: true
    },
    pathImgPerfil: {
        type: Schema.Types.String,
        required: true
    },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

module.exports =  mongoose.model('Fabricante', fabricantesSchema);