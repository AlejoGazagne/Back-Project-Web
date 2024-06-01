const UserServices = require('../services/user.services');
const service = new UserServices();
const { validateUser } = require('../schemas/user.schemas')

// const create = async (req, res) => {
//   try {
//     const response = await service.createUser(req.body);
//     res.json({ message: 'User created', data: response });
//   } catch (error) {
//     res.status(500).send({ message: 'Internal server error' });
//   }
// }

const update = async (req, res) => {
  try {
    req.body.oldEmail = req.token.email;
    const response = await service.updateUser(req.token.id, req.body);
    res.status(200).json({ message: 'User updated', data: response });
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