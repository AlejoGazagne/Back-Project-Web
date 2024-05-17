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
    const response = await postService.getMyPosts(req.token.id);
    res.json({ message: 'Get my posts', data: response, id: req.token.id })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { create, update, get, delet, getMyPosts }