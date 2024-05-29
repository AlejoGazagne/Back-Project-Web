const { PrismaClient } = require('@prisma/client');

class Post {
  constructor() { }

  async getPostById(id) {
    try {
      const prisma = new PrismaClient();
      const post = await prisma.post.findUnique({
        where: {
          id: id
        }
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getThreePost() {
    try {
      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({
        take: 3,
        where: {
          published: true
        },
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getMyPosts(id) {
    try {
      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({
        where: {
          sellerId: id
        }
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getSomePost() {
    try {
      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({
        take: 6,
        where: {
          published: true
        }
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getPosts(body) {
    try {
      const { name, price, ubication, type, rooms, bathrooms, garage, area, onSale, pool, pets } = body;

      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({
        where: {
          title: { contains: name, },
          price: {
            gte: price * 0.85,
            lte: price * 1.15,
          },
          ubication: {
            contains: ubication,
          },
          type: {
            contains: type,
            contains: name
          },
          price: {
            gte: price * 0.85,
            lte: price * 1.15
          },
          ubication: {
            contains: ubication
          },
          type: {
            contains: type
          },
          rooms: rooms,
          bathrooms: bathrooms,
          garage: garage,
          area: area,
          onSale: onSale,
          published: true,
          pool: pool,
          pets: pets
        }
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async createPost(body) {
    try {
      const { title, content, published, price, onSale, ubication, city, neighborhood, frontImage, images, type, rooms, bathrooms, garage, area, pool, pets, seller, sellerId, datetime } = body;

      const prisma = new PrismaClient();
      const post = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: published,
          price: price,
          onSale: onSale,
          ubication: ubication,
          city: city,
          neighborhood: neighborhood,
          frontImage: frontImage,
          images: images,
          type: type,
          rooms: rooms,
          bathrooms: bathrooms,
          garage: garage,
          area: area,
          pool: pool,
          pets: pets,
          seller: seller,
          sellerId: sellerId,
          datetime: datetime
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(body) {
    try {
      const { id, title, content, published, price, onSale, ubication, city, neighborhood, frontImage, images, type, rooms, bathrooms, garage, area, pool, pets, datetime } = body;

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
          city: city,
          neighborhood: neighborhood,
          frontImage: frontImage,
          images: images,
          type: type,
          rooms: rooms,
          bathrooms: bathrooms,
          garage: garage,
          area: area,
          pool: pool,
          pets: pets,
          datetime: datetime
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;