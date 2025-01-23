import { PrismaClient } from "@prisma/client";

import {z} from 'zod'
import moment from "moment-timezone";

const prisma = new PrismaClient()

async function patchZoneService(id:number, req:any) {

    try {

        const schema = z.object({
            name: z.string().max(191, "name length is more 191 charater").optional(),
            description: z.string().max(191, "description length is more 191 charater").optional()
        })

        if (schema.safeParse(req).success === false) {
            return { status: 400, response: {success: false, message: schema.safeParse(req).error?.errors[0].message} }
        }

        const {name, description} = schema.parse(req)

        const data:any = {}
        if (name !== undefined) data['name'] = name
        if (description !== undefined) data['description'] = description

        if (Object.keys(data).length === 0) {
            return { status: 400, response: {success: false, message: 'No data to update'} }
        }

        const hasZone = await prisma.zone.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true
            }
        })

        if (!hasZone) {
            return { status: 404, response: {success: false, message: 'Zone not found'} }
        }

        // ดึงเวลา จาก timezone ปัจจุบัน
        const now = moment().tz('Asia/Bangkok').format();

        const zone = await prisma.zone.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                description: description,
                updatedAt: now
            }
        })
        
        return { status: 200, response: {success: true, message: 'update zone success', data: zone} }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.stack)
        }
        return { status: 500, response: {success: false, message: 'Internal server error'} }
    }
    
}

export default patchZoneService;