const { PrismaClient } = require('@prisma/client');

class Post {
  constructor() { }

  async getPostByPropertyId(id) {
    const prisma = new PrismaClient();
    const post = await prisma.post.findMany({
      where: {
        propertyId: id
      }
    });
    return post;
  }

  async getMyPosts(id) {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      where: {
        propertyId: id
      }
    });
    return posts;
  }

  async getPosts(body) {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        title: { contains: body.title },
        price: {
          ORR: [
            { price: price * 1.3 },
            { price: price * 0.7 }
          ]
        },
        onSale: { contains: body.onSale },
      }
    });
    return posts;
  }

  async createPost(body) {
    const { title, content, published, price, onSale, property, propertyId } = body;

    const prisma = new PrismaClient();
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        price: price,
        onSale: onSale,
        property: property,
        propertyId: propertyId
      }
    })
    return post;
  }

  async updatePost(body) {
    const { id, title, content, published, price, onSale, property, propertyId } = body;

    const prisma = new PrismaClient();
    const post = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        title: title,
        content: content,
        published: published,
        price: price,
        onSale: onSale,
        property: property,
        propertyId: propertyId
      }
    });
    return post;
  }

}

module.exports = Post;