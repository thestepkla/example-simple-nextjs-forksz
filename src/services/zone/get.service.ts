import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getZoneService(id:number) {

    try {
        const zone = await prisma.zone.findFirst({
            where: {
                id: id
            }
        })

        if (!zone) {
            return [404, {success: false, message: 'Zone not found'}]
        }

        return [200, {success: true, data: zone}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
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

        return [200, {success: true, data: zone}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}

export {getZoneService, getListZoneService}