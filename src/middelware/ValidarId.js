const mongoose = require('mongoose')

const validarId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ error: "ID no válido" });
        }
        req.modelo = Modelo;

        next();
    };
};

module.exports = { validarId };