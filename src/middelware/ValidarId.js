const validarModeloId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const modelo = await Modelo.findByPk(id);
        if (!modelo) {
            return res.status(404).json({ error: `${Modelo.name} no encontrado` });
        }
        req.modelo = modelo;
        next();
    };
};

module.exports = { validarModeloId };