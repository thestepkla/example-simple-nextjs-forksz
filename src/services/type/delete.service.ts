import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteTypeService(id:number) {

    try {

        const hasType = await prisma.bookType.findFirst({
            where: {
                id: id
            },
            select: {
                id: true
            }
        })

        if (!hasType) {
            return [404, {success: false, message: 'Type not found'}]
        }

        const type = await prisma.bookType.delete({
            where: {
                id: id
            }
        })
        
        return [200, {success: true, data: type}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}