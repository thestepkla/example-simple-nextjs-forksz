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
            return {status: 404, response: {success: false, message: 'Type not found'}}
        }

        const type = await prisma.bookType.delete({
            where: {
                id: id
            }
        })
        
        return {status: 200, response: {success: true, message: 'delete type success', data: type}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
    
}

export default deleteTypeService