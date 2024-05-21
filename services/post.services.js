const { PrismaClient } = require('@prisma/client');

class Post {
  constructor() { }

  async getPostById(id) {
    const prisma = new PrismaClient();
    const post = await prisma.post.findUnique({
      where: {
        id: id
      }
    });
    return post;
  }

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

  async getSomePost() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      take: 6,
      where: {
        published: true
      }
    });
    return posts;
  }

  async getPosts(body) {
    // const searchParams = {
    //   name: body?.name || '',
    //   price: body?.price || undefined,
    //   ubication: body?.ubication || '',
    //   type: body?.type || '',
    //   rooms: body?.rooms || undefined,
    //   bathrooms: body?.bathrooms || undefined,
    //   garage: body?.garage || undefined,
    //   area: body?.area || undefined,
    //   onSale: body?.onSale || undefined,
    // };

    // const where = {};

    // for (const [key, value] of Object.entries(searchParams)) {
    //   if (value !== undefined && value !== '') {
    //     where[key] = { contains: value };
    //   }
    // }

    // if (!searchParams.price) {
    //   where.OR = [{ price: { _eq: null } }];
    // }
    // const prisma = new PrismaClient();
    // const posts = await prisma.post.findMany({
    //   where: where,
    //   published: true
    // });
    // return posts;

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
  }

  async createPost(body) {
    const { title, content, published, price, onSale, ubication, city, neighborhood, frontImage, images, type, rooms, bathrooms, garage, area, pool, pets, seller, sellerId } = body;

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
      },
    });
    return post;
  }

  async updatePost(body) {
    const { id, title, content, published, price, onSale, ubication, city, neighborhood, frontImage, images, type, rooms, bathrooms, garage, area, pool, pets, } = body;

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
      },
    });
    return post;
  }
}

module.exports = Post;