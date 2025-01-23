import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getTypeService(id:number) {

    try {
        const type = await prisma.bookType.findFirst({
            where: {
                id: Number(id)
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
            return {status: 404, response: {success: false, message: 'Type not found'}}
        }

        return {status: 200, response: {success: true, message: 'get book type success', data: type}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
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

        return {status: 200, response: {success: true, message:'get list type success', data: type}}
    } catch (error) {
        console.log(error);
        return { status:500, response: {success: false, message: 'Internal server error'} };
    }
    
}


export {getTypeService, getListTypeService}