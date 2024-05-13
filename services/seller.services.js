const { PrismaClient } = require('@prisma/client');

class Seller {
  constructor() { }

  async getSellerByEmail(email) {
    const prisma = new PrismaClient();
    const seller = await prisma.seller.findUnique({
      where: {
        email: email,
      },
    });
    return seller;
  }

  async createSeller(body) {
    const { password, email, name, phoneNumber } = body;

    const prisma = new PrismaClient();
    const seller = await prisma.seller.create({
      data: {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber
      }
    });
    return seller;
  }

  async updateSeller(body) {
    const { email, password, name, phoneNumber } = body;

    const prisma = new PrismaClient();
    const seller = await prisma.seller.update({
      where: {
        email: email
      },
      data: {
        password: password,
        name: name,
        phoneNumber: phoneNumber
      }
    });
    return seller;
  }

  async deleteSeller(email) {
    const prisma = new PrismaClient();
    const seller = await prisma.seller.delete({
      where: {
        email: email
      }
    });
    return seller;
  }
}

module.exports = Seller;