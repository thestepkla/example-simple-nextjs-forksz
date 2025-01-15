import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getTypeService(id:number) {

    try {
        const type = await prisma.bookType.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                books: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!type) {
            return [404, {success: false, message: 'Type not found'}]
        }

        return [200, {success: true, data: type}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}


async function getListTypeService() {
    
    try {
        const type = await prisma.bookType.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: 'desc'
            }
        })

        return [200, {success: true, data: type}];
    } catch (error) {
        console.log(error);
        return [500, {success: false, message: 'Internal server error'}];
    }
    
}


export {getTypeService, getListTypeService}