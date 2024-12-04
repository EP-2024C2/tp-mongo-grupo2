const mongoose = require('mongoose')
const { Schema } = require('mongoose');
//const mongoose = require('./db').mongoose;

const componentesSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
    },
    descripcion: {
        type: Schema.Types.String
    },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

componentesSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id,
        delete ret.__v
    }
})

module.exports = mongoose.model('Componente', componentesSchema);