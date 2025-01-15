import { PrismaClient } from "@prisma/client";

import {z} from 'zod'

const prisma = new PrismaClient()

async function patchZoneService(id:number, req:any) {

    try {

        const schema = z.object({
            name: z.string().max(191, "name lenght is more 191 charater").optional(),
            description: z.string().max(191, "description lenght is more 191 charater").optional()
        })

        const {name, description} = schema.parse(req)

        if (schema.safeParse(req).success === false) {
            return [400, {success: false, message: schema.safeParse(req).error?.errors[0].message}]
        }

        const data:any = {}
        if (name !== undefined) data['name'] = name
        if (description !== undefined) data['description'] = description

        if (Object.keys(data).length === 0) {
            return [400, {success: false, message: 'No data to update'}]
        }

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

        const zone = await prisma.zone.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                updatedAt: new Date()
            }
        })
        
        return [200, {success: true, data: zone}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}