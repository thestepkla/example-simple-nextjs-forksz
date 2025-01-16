import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getZoneService(id:number) {

    try {
        const zone = await prisma.zone.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                books: true,
                description: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!zone) {
            return {status: 404, response: {success: false, message: 'Zone not found'}}
        }

        return {status: 200, response: {success: true, message: 'get zone by id success', data: zone}}
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.stack)
        }
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
    
}

async function getListZoneService() {

    try {
        const zone = await prisma.zone.findMany({
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return {status: 200, response: {success: true, message:'get list zone success', data: zone}}
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.stack)
        }
        return { status:500, response: {success: false, message: 'Internal server error'} };
    }
    
}

export {getZoneService, getListZoneService}