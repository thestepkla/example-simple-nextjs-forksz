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
            return {status: 404, response: {success: false, message: 'Zone not found'}}
        }

        const zone = await prisma.zone.delete({
            where: {
                id: id
            }
        })
        
        return {status: 200, response: {success: true, message: 'delete zone success', data: zone}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
    
}

export default deleteZoneService