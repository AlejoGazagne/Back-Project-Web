const FavoriteService = require('../services/favorites.services');
const favoriteService = new FavoriteService();
const PostService = require('../services/post.services');
const postService = new PostService();

const get = async (req, res) => {
  try {
    const favs = await favoriteService.getFavorites(req.token.id);
    let response = []
    for (let i = 0; i < favs.length; i++) {
      tmp = await postService.getPostById(favs[i].postId);
      response.push(tmp);
    }
    res.json({ message: 'Favorites found', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const create = async (req, res) => {
  try {
    req.body.userId = req.token.id;
    //console.log(req.body);
    const response = await favoriteService.createFavorite(req.body);
    res.json({ message: 'Favorite created', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

const delet = async (req, res) => {
  try {
    req.body.userId = req.token.id;
    console.log(req.body);
    const response = await favoriteService.deleteFavorite(req.body);
    res.json({ message: 'Favorite deleted', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = { get, create, delet };