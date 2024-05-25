const { PrismaClient } = require('@prisma/client');

class Favorites {
  constructor() { }

  async getFavorites(userId) {
    const prisma = new PrismaClient();
    const favorites = await prisma.favorites.findMany({
      where: {
        userId: userId
      }
    });
    return favorites;
  }

  async createFavorite(body) {
    const { userId, postId } = body;

    const prisma = new PrismaClient();
    const favorite = await prisma.favorites.create({
      data: {
        userId: userId,
        postId: postId
      }
    })
    return favorite;
  }
}

module.exports = Favorites;