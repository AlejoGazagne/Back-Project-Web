const SellerService = require("../services/seller.services");
const sellerService = new SellerService();
const UserService = require("../services/user.services");
const userService = new UserService();
const { generateToken } = require("../services/generateToken.services");
const { hashPassword, verifyPassword } = require('../services/hashPassword.services');
const { validateUser, validatePartialUser } = require('../schemas/user.schemas')
const { validateSeller, validatePartialSeller } = require('../schemas/seller.schemas')

const authenticateAccount = async (req, res) => {
  try {
    let input = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(input);

    let result = validatePartialUser(input)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const user = await userService.getUserByEmail(input.email);
    if (!user) {
      const seller = await sellerService.getSellerByEmail(input.email);
      console.log(seller);
      if (!seller) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      const verifyS = await verifyPassword(seller.password, input.password)
      if (!verifyS) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      // if (seller.password !== password) {
      //   return res.status(401).json({ message: "Usuario no encontrado" });
      // }

      const token = generateToken(seller, "seller");
      return res.status(200).json({ message: "Usuario autentificado", token: token, role: "seller" });
    }

    const verifyU = await verifyPassword(user.password, input.password)
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

const registerAccount = async (req, res) => {
  try {
    const type = req.body.type;
    let input = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    }

    let result = validateUser(input)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    if (type === 1) {
      const user = await userService.getUserByEmail(input.email);
      if (user) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      req.body.password = await hashPassword(input.password);
      const newUser = await userService.createUser(req.body);
      const token = generateToken(newUser, "user");
      return res.status(200).json({ message: "Usuario registrado", token: token, role: "user" });
    }
    if (type === 2) {
      const seller = await sellerService.getSellerByEmail(input.email);
      if (seller) {
        return res.status(400).json({ message: "El vendedor ya existe" });
      }

      req.body.password = await hashPassword(input.password);
      const newSeller = await sellerService.createSeller(req.body);
      const token = generateToken(newSeller, "seller");
      return res.status(200).json({ message: "Vendedor registrado", token: token, role: "seller" });
    }
    return res.status(400).json({ message: "Tipo de cuenta no válido" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar la cuenta" });
  }
}

module.exports = { authenticateAccount, registerAccount };