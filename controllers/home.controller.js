const propertiesServices = require('../services/properties.services');

const getThreeProperties = async (req, res) => {
    try {
        const properties = await propertiesServices.getProperties(req.body);
        return res.status(200).json(properties);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al obtener propiedades" });
    }
}

module.exports = { getProperties }