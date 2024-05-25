const PostServices = require('../services/post.services');
const postServices = new PostServices;

const getThreePosts = async (req, res) => {
  try {
    let posts = await postServices.getThreePost();
    let response = [];
    for (let i = 0; i < posts.length; i++) {
      const { id, title, rice, descrition, ubication, rooms, bathrooms, garage } = posts[i];
      response.push({ id, title, rice, descrition, ubication, rooms, bathrooms, garage });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener propiedades" });
  }
}

module.exports = { getThreePosts }