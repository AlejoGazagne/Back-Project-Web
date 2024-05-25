const PostService = require("../services/post.services");
const postService = new PostService();

const create = async (req, res) => {
  try {
    //Verificar que esten los valores
    req.body.sellerId = req.token.id;
    const response = await postService.createPost(req.body);
    res.json({ message: 'Post created', data: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const update = async (req, res) => {
  try {
    //Verificar que esten los valores
    const response = await postService.updatePost(req.body);
    res.json({ message: 'Post updated', data: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const get = async (req, res) => {
  try {
    const response = await postService.getPosts(req.body);
    res.json({ message: 'Get posts', data: response })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const delet = async (req, res) => {
  try {
    const response = await postService.deletePost(req.params.id);
    res.json({ message: 'Post deleted', data: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getMyPosts = async (req, res) => {
  try {
    const posts = await postService.getMyPosts(req.token.id);
    var response = []
    for (let i = 0; i < posts.length; i++) {
      const { id, title, content, price, ubication, frontImage, description, rooms, bathrooms, garage } = posts[i]
      response.push({ id, title, content, price, ubication, frontImage, description, rooms, bathrooms, garage })
    }
    res.json({ message: 'Get my posts', data: response })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { create, update, get, delet, getMyPosts }