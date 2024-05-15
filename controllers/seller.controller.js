const SellerService = require('../services/seller.services');
const service = new SellerService();

const create = async (req, res) => {
  try {
    const response = await service.createSeller(req.body);
    res.json({ message: 'Seller created', data: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const update = async (req, res) => {
  try {
    const response = await service.updateSeller(req.body);
    res.json({ message: 'Seller updated', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const get = async (req, res) => {
  try {
    const response = await service.getSellerByEmail(req.params.email);
    res.json({ message: 'Seller found', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const delet = async (req, res) => {
  try {
    const response = await service.deleteSeller(req.params.email);
    res.json({ message: 'Seller deleted', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = { create, update, get, delet };