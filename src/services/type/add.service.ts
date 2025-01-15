import { PrismaClient } from "@prisma/client";

import {z} from 'zod'

const prisma = new PrismaClient()

async function addTypeService(req:any) {

    try {
        const schema = z.object({
            name: z.string({message: 'Name is required'}).max(191, "name lenght is more 191 charater"),
        });
    
        const {name} = schema.parse(req);
    
        if (schema.safeParse(req).success === false) {
            return [400, {success: false, message: schema.safeParse(req).error?.errors[0].message}];
        }

        const type = await prisma.bookType.create({
            data: {
                name: name
            }
        });

        return [200, {success: true, data: type}];
    } catch (error) {
        console.log(error);
        return [500, {success: false, message: 'Internal server error'}];
    }
    
}

export default addTypeService;