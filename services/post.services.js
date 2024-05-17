const { PrismaClient } = require('@prisma/client');

class Post {
  constructor() { }

  async getThreePost() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      take: 3,
      where: {
        published: true
      },
    });
    return posts;
  }

  async getMyPosts(id) {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      where: {
        sellerId: id
      }
    });
    return posts;
  }

  async getPosts(body) {
    const { name, price, ubication, type, rooms, bathrooms, garage, area, onSale } = body;

    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        name: { contains: name },
        price: price,
        ubication: { contains: ubication },
        type: type,
        rooms: rooms,
        bathrooms: bathrooms,
        garage: garage,
        area: area,
        onSale: onSale
      }
    });
    return posts;
  }

  async createPost(body) {
    const { title, content, published, price, onSale, ubication, frontImage, images, type, rooms, bathrooms, garage, area, seller, sellerId } = body;

    const prisma = new PrismaClient();
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        price: price,
        onSale: onSale,
        ubication: ubication,
        frontImage: frontImage,
        images: images,
        type: type,
        rooms: rooms,
        bathrooms: bathrooms,
        garage: garage,
        area: area,
        seller: seller,
        sellerId: sellerId
      }
    })
    return post;
  }

  async updatePost(body) {
    const { id, title, content, published, price, onSale, ubication, frontImage, images, type, rooms, bathrooms, garage, area } = body;

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
        ubication: ubication,
        frontImage: frontImage,
        images: images,
        type: type,
        rooms: rooms,
        bathrooms: bathrooms,
        garage: garage,
        area: area,
      }
    })
    return post;
  }

}

module.exports = Post;