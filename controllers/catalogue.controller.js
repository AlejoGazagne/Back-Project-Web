const PostService = require("../services/post.services");
const postService = new PostService();

const getSomePost = async (req, res) => {
  try {
    const posts = await postService.getSomePost(req.body);
    let response = [];
    for (let i = 0; i < posts.length; i++) {
      const { id, title, price, frontImage, description, rooms, bathrooms, garage } = posts[i]
      response.push({ id, title, price, frontImage, description, rooms, bathrooms, garage })
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPostsFilter = async (req, res) => {
  try {
    const response = await postService.getPosts(req.body);
    for (let i = 0; i < response.length; i++) {
      const { id, title, price, frontImage, description, rooms, bathrooms, garage } = posts[i]
      response.push({ id, title, price, frontImage, description, rooms, bathrooms, garage })
    }
    res.status(200).json({ message: 'Get posts', data: response })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const response = await postService.getPostById(parseInt(req.params.id));
    res.status(200).json({ message: 'Get post by id', data: response })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { getSomePost, getPostsFilter, getPostById }