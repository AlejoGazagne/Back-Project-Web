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
      const { type, onSale, priceMin, priceMax, city, neighborhood, roomCount, bathroomCount, garageCount, pool, pets } = input;
      //const onSale = JSON.parse(operation);
      //const Vpets = JSON.parse(pets);
      //const Vpool = JSON.parse(pool);

      const where = {};

      if (type != "") where.type = type;
      if (onSale != "undefined") where.onSale = JSON.parse(onSale)
      if (priceMin != "undefined") where.price = { ...where.price, gte: parseFloat(priceMin) };
      if (priceMax != "undefined") where.price = { ...where.price, lte: parseFloat(priceMax) };
      if (city != '') where.city = city;
      if (neighborhood != '') where.neighborhood = neighborhood;
      if (roomCount != "undefined") where.rooms = parseInt(roomCount);
      if (bathroomCount != "undefined") where.bathrooms = parseInt(bathroomCount);
      if (garageCount != "undefined") where.garage = parseInt(garageCount);
      where.published = true;
      if (JSON.parse(pool)) where.pool = JSON.parse(pool);
      if (JSON.parse(pets)) where.pets = JSON.parse(pets);

      console.log(where)

      const prisma = new PrismaClient();
      const posts = await prisma.post.findMany({ where });
      return posts;
    } catch (error) {
      console.log(error)
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