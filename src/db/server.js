const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL || 'mongodb://Grupo2:123456@localhost:27017/'

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log('Conexión a mongo con éxito');
    } catch (err) {
        console.error('Error al conectarse a mongo', err);
    }
}

module.exports = {connectToDatabase, mongoose}