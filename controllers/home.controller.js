const PostServices = require('../services/post.services');
const postServices = new PostServices;

const getThreeProperties = async (req, res) => {
    try {
        const properties = await propertiesServices.getThreeProperty();
        console.log(properties);
        return res.status(200).json(properties);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al obtener propiedades" });
    }
}

module.exports = { getThreeProperties }