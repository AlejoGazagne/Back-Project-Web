const { PrismaClient } = require('@prisma/client');

class Valorations {
  constructor() { }

  async getValorations(postid) {
    const prisma = new PrismaClient();
    const valoration = await prisma.valorations.findMany({
      where: {
        postId: postid
      }
    });
    return valoration;
  }

  async createValoration(body) {
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
  }
}

module.exports = Valorations;