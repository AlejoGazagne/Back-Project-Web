const SellerService = require('../services/seller.services');
const service = new SellerService();
const { generateToken } = require("../services/generateToken.services");

const update = async (req, res) => {
  try {
    const response = await service.updateSeller(req.token.id, req.body);
    console.log(response)
    const token = generateToken(response, "seller");
    res.status(200).json({ message: 'Seller updated', data: { response, token } });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const get = async (req, res) => {
  try {
    const response = await service.getSellerByEmail(req.token.email);
    res.status(200).json({ message: 'Seller found', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const delet = async (req, res) => {
  try {
    const response = await service.deleteSeller(req.token.email);
    res.status(200).json({ message: 'Seller deleted', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = { update, get, delet };