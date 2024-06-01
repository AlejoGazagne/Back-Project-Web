const { PrismaClient } = require('@prisma/client');
const { hashPassword, verifyPassword } = require('./hashPassword.services');

class UserServices {

  constructor() { }

  async getUserByEmail(email) {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(body) {
    try {
      var { password, email, name, phoneNumber } = body;

      const prisma = new PrismaClient();
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name: name,
          phoneNumber: phoneNumber
        }
      });
      return user;
    } catch (error) {
      throw error;
    }

  }

  async updateUser(id, body) {
    try {
      let { email, name, phoneNumber } = body;
      let userOld = await this.getUserByEmail(body.oldEmail);

      const prisma = new PrismaClient();
      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: email,
          password: userOld.password,
          name: name,
          phoneNumber: phoneNumber
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(email) {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.delete({
        where: {
          email: email
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;