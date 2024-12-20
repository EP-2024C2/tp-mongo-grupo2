const mongoose = require('mongoose')
const { Schema } = require('mongoose');
//const mongoose = require('./db').mongoose;

const productosSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
    },
    descripcion: {
        type: Schema.Types.String
    },
    precio: {
        type: Schema.Types.Number,
        required: true,
    },
    pathImg: {
        type: Schema.Types.String
    },
    fabricantes: [{ type: Schema.Types.ObjectId, ref: 'Fabricante' }],
    componentes: [{ type: Schema.Types.ObjectId, ref: 'Componente' }]
});

productosSchema.set('toJSON',{
    transform:(_,ret)=>{
        delete ret._id,
        delete ret.__v
    }
})

module.exports = mongoose.model('Producto', productosSchema);