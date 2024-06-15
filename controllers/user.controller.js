const UserServices = require('../services/user.services');
const service = new UserServices();
const { generateToken } = require("../services/generateToken.services");
const { validateUser } = require('../schemas/user.schemas')

const update = async (req, res) => {
  try {
    validateUser(req.body)
    req.body.oldEmail = req.token.email;
    const response = await service.updateUser(req.token.id, req.body);
    const token = generateToken(response, "user");
    res.status(200).json({ message: 'User updated', data: { response, token } });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const get = async (req, res) => {
  try {
    const response = await service.getUserByEmail(req.token.email);
    res.status(200).json({ message: 'User found', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const delet = async (req, res) => {
  try {
    const response = await service.deleteUser(req.token.email);
    res.status(200).json({ message: 'User deleted', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = { update, get, delet };