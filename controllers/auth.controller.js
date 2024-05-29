const SellerService = require("../services/seller.services");
const sellerService = new SellerService();
const UserService = require("../services/user.services");
const userService = new UserService();
const { generateToken } = require("../services/generateToken.services");
const { hashPassword, verifyPassword } = require('../services/hashPassword.services');

const authenticateAccount = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    const user = await userService.getUserByEmail(email);
    if (!user) {
      const seller = await sellerService.getSellerByEmail(email);
      console.log(seller);
      if (!seller) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      const verifyS = await verifyPassword(seller.password, password)
      if (!verifyS) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      // if (seller.password !== password) {
      //   return res.status(401).json({ message: "Usuario no encontrado" });
      // }

      const token = generateToken(seller, "seller");
      return res.status(200).json({ message: "Usuario autentificado", token: token, role: "seller" });
    }

    const verifyU = await verifyPassword(user.password, password)
    if (!verifyU) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    // if (user.password !== password) {
    //   return res.status(401).json({ message: "Usuario no encontrado" });
    // }

    const token = generateToken(user, "user");
    return res.status(200).json({ message: "Usuario autentificado", token: token, role: "user" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al autentificar usuario" });
  }
};

module.exports = { authenticateAccount };