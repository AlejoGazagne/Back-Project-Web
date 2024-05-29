const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./hashPassword.services');

class Seller {
  constructor() { }

  async getSellerByEmail(email) {
    try {
      const prisma = new PrismaClient();
      const seller = await prisma.seller.findUnique({
        where: {
          email: email,
        },
      });
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async createSeller(body) {
    try {
      let { password, email, name, phoneNumber, profileImage, description } = body;

      const prisma = new PrismaClient();
      const seller = await prisma.seller.create({
        data: {
          email: email,
          password: password,
          name: name,
          phoneNumber: phoneNumber,
          profileImage: profileImage,
          description: description
        }
      });
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async updateSeller(id, body) {
    try {
      let { email, password, name, phoneNumber, profileImage, description } = body;
      password = await hashPassword(password)

      const prisma = new PrismaClient();
      const seller = await prisma.seller.update({
        where: {
          id: id
        },
        data: {
          email: email,
          password: password,
          name: name,
          phoneNumber: phoneNumber,
          profileImage: profileImage,
          description: description
        }
      });
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async deleteSeller(email) {
    try {
      const prisma = new PrismaClient();
      const seller = await prisma.seller.delete({
        where: {
          email: email
        }
      });
      return seller;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Seller;