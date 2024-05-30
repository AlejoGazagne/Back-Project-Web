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

  async getPosts(input) {
    try {
      const { type, operation, priceMin, priceMax, city, neighborhood, roomCount, bathroomCount, garageCount, pool, pets } = input;
      const onSale = JSON.parse(operation);
      const Vpets = JSON.parse(pets);
      const Vpool = JSON.parse(pool);

      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({
        where: {
          type: type,
          onSale: onSale,
          price: {
            gte: parseFloat(priceMin),
            lte: parseFloat(priceMax),
          },
          city: city,
          neighborhood: neighborhood,
          rooms: parseInt(roomCount),
          bathrooms: parseInt(bathroomCount),
          garage: parseInt(garageCount),
          published: true,
          pool: Vpool,
          pets: Vpets
        }
      });
      return posts;
    } catch (error) {
      //console.log(error)
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