const PostService = require("../services/post.services");
const postService = new PostService();

const getAllPost = async (req, res) => {
    try {
        const posts = await postService.getPosts(req.body);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPostsFilter = async (req, res) => {
    try {
        const response = await postService.getPosts(req.body);
        res.json({ message: 'Get posts', data: response })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getAllPost, getPostsFilter }