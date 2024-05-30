const { PrismaClient } = require('@prisma/client');

class Favorites {
  constructor() { }

  async getFavorites(userId) {
    try {
      const prisma = new PrismaClient();
      const favorites = await prisma.favorites.findMany({
        where: {
          userId: userId
        }
      });
      return favorites;
    } catch (error) {
      throw error;
    }
  }

  async createFavorite(body) {
    try {
      const { userId, postId } = body;

      const prisma = new PrismaClient();
      const favorite = await prisma.favorites.create({
        data: {
          userId: userId,
          postId: postId
        }
      })
      return favorite;
    } catch (error) {
      throw error;
    }
  }

  async deleteFavorite(body) {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Favorites;