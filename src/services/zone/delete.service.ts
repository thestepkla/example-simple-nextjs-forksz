import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteZoneService(id:number) {

    try {

        const hasZone = await prisma.zone.findFirst({
            where: {
                id: id
            },
            select: {
                id: true
            }
        })

        if (!hasZone) {
            return [404, {success: false, message: 'Zone not found'}]
        }

        const zone = await prisma.zone.delete({
            where: {
                id: id
            }
        })
        
        return [200, {success: true, data: zone}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}