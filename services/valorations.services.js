const { PrismaClient } = require('@prisma/client');

class Valorations {
  constructor() { }

  async getValorations(postid) {
    try {
      const prisma = new PrismaClient();
      const valoration = await prisma.valorations.findMany({
        where: {
          postId: postid
        }
      });
      return valoration;
    } catch (error) {
      throw error;
    }
  }

  async createValoration(body) {
    try {
      const { qualification, comment, post, postId } = body;

      const prisma = new PrismaClient();
      const valoration = await prisma.valorations.create({
        data: {
          qualification: qualification,
          comment: comment,
          post: post,
          postId: postId
        }
      })
      return valoration;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Valorations;