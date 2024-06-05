const PostService = require("../services/post.services");
const postService = new PostService();
const SellerService = require("../services/seller.services");
const sellerService = new SellerService()

const getSomePost = async (req, res) => {
  try {
    let currentPage = parseInt(req.query.page)

    const posts = await postService.getSomePost(currentPage);
    let response = [];
    for (let i = 0; i < posts.posts.length; i++) {
      const { id, title, price, frontImage, content, rooms, bathrooms, garage, ubication } = posts.posts[i]
      response.push({ id, title, price, frontImage, content, rooms, bathrooms, garage, ubication })
    }
    res.status(200).json({ message: 'Get posts', data: { items: response, size: posts.size } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPostsFilter = async (req, res) => {
  try {
    console.log(req.query)
    const posts = await postService.getPosts(req.query);
    var response = [];
    for (let i = 0; i < posts.posts.length; i++) {
      const { id, title, price, frontImage, content, rooms, bathrooms, garage, ubication } = posts.posts[i]
      response.push({ id, title, price, frontImage, content, rooms, bathrooms, garage, ubication })
    }
    //console.log(response)
    res.status(200).json({ message: 'Get posts', data: { size: posts.size, items: response } })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const response = await postService.getPostById(parseInt(req.params.id));
    const seller = await sellerService.getSellerById(response.sellerId)
    console.log(response)
    console.log(seller)
    res.status(200).json({ message: 'Get post', data: { items: response, seller: seller } })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
}

module.exports = { getSomePost, getPostsFilter, getPostById }