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

  async deleteFavorite(body) {
    const { userId, postId } = body;

    const prisma = new PrismaClient();
    const favorite = await prisma.favorites.findFirst({
      where: {
        userId: userId,
        postId: postId

      }
    })
    if (favorite) {
      const deleted = await prisma.favorites.delete({
        where: {
          id: favorite.id
        }
      })
      return deleted;
    }
    return null;
  }
}

module.exports = Favorites;