import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function patchTypeService(id:number, req:any) {
    try {

        // Check request body โดยไม่ใช้ zod
        if (!req.name) {
            return [400, {success: false, message: 'name is required'}];
        }

        //check type name is string
        if (typeof req.name !== 'string') {
            return [400, {success: false, message: 'name must be a string'}];
        }

        if (req.name.length > 191) {
            return [400, {success: false, message: 'name is too long'}];
        }

        // Check if the type exists
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

        const type = await prisma.bookType.update({
            where: {
                id: id
            },
            data: {
                name: req.name
            }
        })

        return [200, {success: true, data: type}];
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
}


export default patchTypeService;