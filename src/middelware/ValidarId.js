const validarId = (modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const modelo = await modelo.findByPk(id);
        if (!modelo) {
            return res.status(404).json({ error: `${modelo.name} no encontrado` });
        }
        req.modelo = modelo;
        next();
    };
};

module.exports = { validarId };