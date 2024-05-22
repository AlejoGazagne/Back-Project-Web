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
      console.log(error);
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
      console.log(error);
    }

  }

  async updateUser(id, body) {
    try {
      let { email, password, name, phoneNumber } = body;
      password = await hashPassword(password);

      const prisma = new PrismaClient();
      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: email,
          password: password,
          name: name,
          phoneNumber: phoneNumber
        }
      });
      return user;
    } catch (error) {
      console.log(error)
    }

  }

  async deleteUser(email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.delete({
      where: {
        email: email
      }
    });
    return user;
  }
}

module.exports = UserServices;