const { PrismaClient } = require('@prisma/client');

class Properties {
  constructor() { }

  async getPropertiesByUbicacion(ubication) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        ubication: ubication
      }
    });
    return properties;
  }

  async getPropertiesByType(type) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        type: type
      }
    });
    return properties;
  }

  async getPropertiesByRooms(rooms) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        rooms: rooms,
        // OR: [
        //     { rooms: rooms }, 
        //     { rooms: rooms + 1 }, 
        //     { rooms: rooms - 1 }, 
        //   ], range of rooms
      }
    });
    return properties;
  }

  async getPropertiesByBathrooms(bathrooms) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        bathrooms: bathrooms
      }
    });
    return properties;
  }

  // va en post
  // async getPropertiesByPrice(price) {
  //     const prisma = new PrismaClient();
  //     const properties = await prisma.properties.findMany({
  //         where: {
  //             // price: price
  //             OR: [
  //                     { price: price }, 
  //                     { price: price*1.3 }, 
  //                     { price: price*0.7 }, 
  //                   ], // range of prices
  //         }
  //     });
  //     return properties;
  // }

  async getPropertiesByArea(area) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        area: area
        // OR: [
        //     { area: area }, 
        //     { area: area*1.3 }, 
        //     { area: area*0.7 }, 
        //   ], range of areas
      }
    });
    return properties;
  }

  async getPropertiesByGarage(garage) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
      where: {
        garage: garage,
      }
    });
    return properties;
  }

  async buscar(body){

  }

  async createProperty(body) {
    const { name, description, price, ubication, image, type, rooms, bathrooms, garage, area, seller, selerId } = body;

    const prisma = new PrismaClient();
    const property = await prisma.properties.create({
      data: {
        name: name,
        description: description,
        price: price,
        ubication: ubication,
        image: image,
        type: type,
        rooms: rooms,
        bathrooms: bathrooms,
        garage: garage,
        area: area,
        seller: seller,
        sellerId: selerId
      }
    });
    return property;
  }

  // Metodos para actualizar Propiedades
  async updateProperty(body) {
    const { id, name, description, price, ubication, image, type, rooms, bathrooms, garage, area, seller, selerId } = body;

    const prisma = new PrismaClient();
    const property = await prisma.properties.update({
      where: {
        id: id
      },
      data: {
        name: name,
        description: description,
        price: price,
        ubication: ubication,
        image: image,
        type: type,
        rooms: rooms,
        bathrooms: bathrooms,
        garage: garage,
        area: area,
        seller: seller,
        sellerId: selerId
      }
    });
  }
}

module.exports = Properties;