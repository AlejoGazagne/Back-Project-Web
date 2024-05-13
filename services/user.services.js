const { PrismaClient } = require('@prisma/client');

class UserServices {

  constructor() { }

  async getUserByEmail(email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async createUser(body) {
    const { password, email } = body;

    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password
      }
    });
    return user;
  }

  async updateUser(body) {
    const { email, password } = body;

    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        password: password
      }
    });
    return user;
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