const PostService = require("../services/post.services");
const postService = new PostService();

const getSomePost = async (req, res) => {
    try {
        const posts = await postService.getSomePost(req.body);
        for (let i = 0; i < posts.length; i++) {
            delete posts[i].images
            delete posts[i].area
            delete posts[i].published
            delete posts[i].ubication
            delete posts[i].sellerId
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
            delete response[i].images
            delete response[i].area
            delete response[i].published
            delete response[i].ubication
            delete response[i].sellerId
        }
        res.json({ message: 'Get posts', data: response })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const response = await postService.getPostById(parseInt(req.params.id));
        res.json({ message: 'Get post by id', data: response })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getSomePost, getPostsFilter, getPostById }