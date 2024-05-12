const { PrismaClient } = require('@prisma/client');

async function getPropertiesByUbicacion(ubication) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
        where: {
            ubication: ubication
        }
    });
    return properties;
}

async function getPropertiesByType(type) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
        where: {
            type: type
        }
    });
    return properties;
}

async function getPropertiesByRooms(rooms) {
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

async function getPropertiesByBathrooms(bathrooms) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
        where: {
            bathrooms: bathrooms
        }
    });
    return properties;
}

// async function getPropertiesByPrice(price) {
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

async function getPropertiesByArea(area) {
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

async function getPropertiesByGarage(garage) {
    const prisma = new PrismaClient();
    const properties = await prisma.properties.findMany({
        where: {
            garage: garage
        }
    });
    return properties;
}

// Metodos para crear Propiedades
async function createProperty(name, description, price, ubication, image, type, rooms, bathrooms, garage, area, seller, selerId) {
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
// async function updateProperty(propertyParam) {
//     const prisma = new PrismaClient();

//     const property = await prisma.properties.update{
//         where: {
//             id: propertyParam.id
//         },
//         update: {
//             name: propertyParam.name,
//             description: propertyParam.description,
//             price: propertyParam.price,
//             ubication: propertyParam.ubication,
//             image: propertyParam.image,
//             type: propertyParam.type,
//             rooms: propertyParam.rooms,
//             bathrooms: propertyParam.bathrooms,
//             garage: propertyParam.garage,
//             area: propertyParam.area,
//             seller: propertyParam.seller,
//             sellerId: propertyParam.sellerId,
//         },
//     };
    
// }

module.exports = { 
    getPropertiesByUbicacion, 
    getPropertiesByType, 
    getPropertiesByRooms, 
    getPropertiesByBathrooms, 
    getPropertiesByArea, 
    getPropertiesByGarage, 
    createProperty, 
    // updateProperty
};