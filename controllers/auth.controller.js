const SellerService = require('../services/seller.services');
const sellerService = new SellerService();
const UserService = require('../services/user.services')
const userService = new UserService()

const autentificarUsuario = async (res, req) => {
    try {
        const { email, password } = req.body
        const user = await userService.getUserByEmail(email)
        if (!user) {
            const seller = await sellerService.getSellerByEmail(email)
            if(!seller){
                return res.status(401).json({ message: 'Usuario no encontrado' })
            }
            if (seller.password !== password) {
                return res.status(401).json({ message: 'Usuario no encontrado' })
            }
            
        } else if (user.password !== password) {
            return res.status(401).json({ message: 'Usuario no encontrado' })
        }

        return res.status(200).json({ message: 'Usuario autentificado' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error al autentificar usuario' })
    }
}


module.exports = { autentificarUsuario };