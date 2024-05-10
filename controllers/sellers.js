const { PrismaClient } = require('@prisma/client');

async function getSellerByEmail(email) {
    const prisma = new PrismaClient();
    const seller = await prisma.seller.findUnique({
      where: {
        email: email,
      },
    });
    return seller;
}

async function createSeller(email, password, name, phoneNumber){
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

module.exports = { getSellerByEmail, createSeller };