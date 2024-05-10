const { PrismaClient } = require('@prisma/client');


    async function getUserByEmail(email) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        return user;
    }

    async function createUser(email, password){
        const prisma = new PrismaClient();
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password
            }
        });
        return user;
    }

    module.exports = {createUser, getUserByEmail};