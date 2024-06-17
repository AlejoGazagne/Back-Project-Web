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

  // async getThreePost() {
  //   try {
  //     const prisma = new PrismaClient();
  //     const posts = await prisma.post.findMany({
  //       take: 3,
  //       where: {
  //         published: true
  //       },
  //     });
  //     return posts;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  // async getSomePost(currentPage) {
  //   try {
  //     let pageSize = 10

  //     const prisma = new PrismaClient();

  //     const size = await prisma.post.count()
  //     const posts = await prisma.post.findMany({
  //       skip: (currentPage - 1) * pageSize,
  //       take: pageSize,
  //       where: {
  //         published: true
  //       }
  //     });
  //     const rsp = {
  //       size: size,
  //       posts: posts
  //     }
  //     return rsp;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async getPosts(input) {
    try {
      const { type, onSale, priceMin, priceMax, city, neighborhood, roomCount, bathroomCount, garageCount, pool, pets, idSeller } = input;
      let currentPage = parseInt(input.page)
      let pageSize = parseInt(input.take) || 10

      const where = {};

      if (type != undefined && type != "") where.type = type;
      if (onSale != undefined && onSale != "") where.onSale = JSON.parse(onSale)
      if (priceMin != undefined && priceMin != "") where.price = { ...where.price, gte: parseFloat(priceMin) };
      if (priceMax != undefined && priceMax != "") where.price = { ...where.price, lte: parseFloat(priceMax) };
      if (city != undefined && city != '') where.city = city;
      if (neighborhood != undefined && neighborhood != '') where.neighborhood = neighborhood;
      if (roomCount != undefined && roomCount != "") {
        if (parseInt(roomCount) === 4)
          where.rooms = { gte: parseInt(roomCount) }
        else
          where.rooms = parseInt(roomCount);
      }
      if (bathroomCount != undefined && bathroomCount != "") {
        if (parseInt(bathroomCount) === 4)
          where.bathrooms = { gte: parseInt(bathroomCount) }
        else
          where.bathrooms = parseInt(bathroomCount);
      }
      if (garageCount != undefined && garageCount != "") {
        if (parseInt(garageCount) === 4)
          where.garage = { gte: parseInt(garageCount) }
        else
          where.garage = parseInt(garageCount);
      }
      where.published = true;
      if (pool != undefined && pool != "") where.pool = JSON.parse(pool);
      if (pets != undefined && pets != "") where.pets = JSON.parse(pets);

      console.log(where)

      const prisma = new PrismaClient();
      const size = await prisma.post.count({ where })
      const posts = await prisma.post.findMany({ skip: (currentPage - 1) * pageSize, take: pageSize, where });
      const rsp = {
        size: size,
        posts: posts
      }
      return rsp;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async createPost(body) {
    try {

      if (body.images.length === 0 && body.frontImage === undefined) {
        body.published = false
        body.frontImage = ""
      }

      const prisma = new PrismaClient();
      const post = await prisma.post.create({
        data: {
          ...body
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(body) {
    try {
      //const { id, title, content, published, price, onSale, ubication, city, neighborhood, frontImage, images, type, rooms, bathrooms, garage, area, pool, pets, datetime } = body;
      const { id } = body
      console.log(body)
      const prisma = new PrismaClient();
      const post = await prisma.post.update({
        where: {
          id: id
        },
        data: {
          ...body,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      const prisma = new PrismaClient();
      const post = await prisma.post.delete({
        where: {
          id: id
        }
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;