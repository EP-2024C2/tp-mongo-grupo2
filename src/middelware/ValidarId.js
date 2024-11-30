const mongoose = require('mongoose')

const validarId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        // Verifica si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ error: "ID no válido" });
        }
        const modelo= Modelo.findById(id)
        if (!modelo) {
            return res.status(404).json({ error: `${modelo.name} no encontrado` });
        }

        req.modelo = Modelo;
       
        next();
    };
};

module.exports = { validarId };