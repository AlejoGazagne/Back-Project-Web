const PostService = require("../services/post.services");
const postService = new PostService();
const SellerService = require("../services/seller.services");
const sellerService = new SellerService()

const getSomePost = async (req, res) => {
  try {
    let currentPage = parseInt(req.params.page)
    console.log(currentPage)
    const posts = await postService.getSomePost(currentPage);
    let response = [];
    for (let i = 0; i < posts.length; i++) {
      const { id, title, price, frontImage, content, rooms, bathrooms, garage, ubication } = posts[i]
      response.push({ id, title, price, frontImage, content, rooms, bathrooms, garage, ubication })
    }
    res.status(200).json({ message: 'Get posts', data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPostsFilter = async (req, res) => {
  try {
    console.log(req.query)
    const posts = await postService.getPosts(req.query);
    var response = [];
    for (let i = 0; i < posts.length; i++) {
      const { id, title, price, frontImage, content, rooms, bathrooms, garage, ubication } = posts[i]
      response.push({ id, title, price, frontImage, content, rooms, bathrooms, garage, ubication })
    }
    //console.log(response)
    res.status(200).json({ message: 'Get posts', data: response })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const response = await postService.getPostById(parseInt(req.params.id));
    const seller = await sellerService.getSellerById(response.sellerId)
    res.status(200).json({ message: 'Get post by id', data: response, seller: seller })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { getSomePost, getPostsFilter, getPostById }