const SellerService = require("../services/seller.services");
const sellerService = new SellerService();
const UserService = require("../services/user.services");
const userService = new UserService();
const { hashPassword } = require("../services/hashPassword.services");
const { generateToken } = require("../services/generateToken.services");
const { hash } = require("argon2");

const registerAccount = async (req, res) => {
  try {
    const { email, password, type, name, phoneNumber } = req.body;

    if (type === 1) {
      if (!email || !password) {
        return res.status(400).json({ message: "Faltan campos" });
      }
      const user = await userService.getUserByEmail(email);
      if (user) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
      req.body.password = await hashPassword(password);
      const newUser = await userService.createUser(req.body);
      const token = generateToken(newUser, "user");
      return res.status(200).json({ message: "Usuario registrado", token: token });
    }
    if (type === 2) {
      if (!email || !password || !name || !phoneNumber) {
        return res.status(400).json({ message: "Faltan campos" });
      }

      const seller = await sellerService.getSellerByEmail(email);
      if (seller) {
        return res.status(400).json({ message: "El vendedor ya existe" });
      }

      req.body.password = await hashPassword(password);
      const newSeller = await sellerService.createSeller(req.body);
      const token = generateToken(newSeller, "seller");
      return res.status(200).json({ message: "Vendedor registrado", token: token });
    }
    return res.status(400).json({ message: "Tipo de cuenta no válido" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar la cuenta" });
  }
}

module.exports = { registerAccount };