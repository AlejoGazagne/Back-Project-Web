const { PrismaClient } = require('@prisma/client');

class UserService{
    constructor(){}

    async getUserByEmail(email) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        return user;
    }

    async createUser(email, password){
        const prisma = new PrismaClient();
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password
            }
        });
        return user;
    }

    async updateUser(email, password){
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
}
 
module.exports = UserService;