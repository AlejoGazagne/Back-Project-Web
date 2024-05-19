const SellerService = require('../services/seller.services');
const service = new SellerService();
const PostService = require('../services/post.services');
const postService = new PostService();

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

// const getPosts = async (req, res) => {
//   try {
//     console.log(req.token);

//     //const seller = await service.getSellerByEmail(req.token.email);

//     const properties = await propertyService.getPropertiesBySellerId(sellerId);
//     console.log(properties);
//     var posts = [];

//     for (let i = 0; i < properties.length; i++) {
//       var response = await postService.getPostByPropertyId(properties[i].id);
//       posts.push(response);
//     }

//     res.json({ message: 'Posts found', data: posts });
//   } catch (error) {
//     res.status(500).send({ message: 'Internal server error', error: error.message });
//   }
// }

module.exports = { create, update, get, delet };