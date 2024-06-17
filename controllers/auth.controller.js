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

      const token = generateToken(seller, "seller");
      return res.status(200).json({ message: "Usuario autentificado", token: token, role: "seller" });
    }

    const verifyU = await verifyPassword(user.password, input.password)
    if (!verifyU) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

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

    if (type === 1) {
      let inputUser = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
      }

      let result = validateUser(inputUser)
      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const user = await userService.getUserByEmail(inputUser.email);
      if (user) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      inputUser.password = await hashPassword(inputUser.password);
      const newUser = await userService.createUser(inputUser);
      const token = generateToken(newUser, "user");
      return res.status(200).json({ message: "Usuario registrado", token: token, role: "user" });
    }
    if (type === 2) {
      let inputSeller = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        description: req.body.description,
        profileImage: req.body.profileImage
      }

      let resultSeller = validateSeller(inputSeller)
      if (!resultSeller.success) return res.status(400).json({ error: JSON.parse(resultSeller.error.message) })

      const seller = await sellerService.getSellerByEmail(inputSeller.email);
      if (seller) {
        return res.status(400).json({ message: "El vendedor ya existe" });
      }

      inputSeller.password = await hashPassword(inputSeller.password);
      const newSeller = await sellerService.createSeller(inputSeller);
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