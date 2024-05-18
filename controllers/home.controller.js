const PostServices = require('../services/post.services');
const postServices = new PostServices;

const getThreePosts = async (req, res) => {
  try {
    let posts = await postServices.getThreePost();
    for (let i = 0; i < posts.length; i++) {
      delete posts[i].images;
      delete posts[i].area;
      delete posts[i].sellerId;
      delete posts[i].published;
      delete posts[i].ubication;
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener propiedades" });
  }
}

module.exports = { getThreePosts }