import { PrismaClient } from "@prisma/client";

import moment from "moment-timezone";

import {z} from 'zod'

const prisma = new PrismaClient()

async function patchBookService(id:number, req:any) {

    try {
        const schema = z.object({
            title: z.string({message: 'Title is required'}).max(191, "title lenght is more 191 charater").optional(),
            auth: z.string().max(191, "title lenght is more 191 charater").optional(),
            description: z.string().max(191, "title lenght is more 191 charater").optional(),
            zone_id: z.number({message: 'Zone is required (int)'}).optional(),
            type_id: z.number({message: 'Type is required (int)'}).optional(),
        })
    
        if (schema.safeParse(req).success === false) {
            if (schema.safeParse(req).error?.errors[0].message === 'Title is required') {
                return { status: 400, response: {success: false, message: 'Title is required'} };
            }
        }

        const {title, auth, description, zone_id, type_id} = schema.parse(req)

        const payload:any = {}

        // Check if the request has the key, if yes, then add it to the payload
        if (title !== undefined) payload['title'] = title
        if (auth !== undefined) payload['author'] = auth
        if (description !== undefined) payload['description'] = description
        if (zone_id !== undefined) payload['zone'] = {connect: { id: zone_id }}
        if (type_id !== undefined) payload['type'] = {connect: { id: type_id }}

        // ตรวจสอบว่ามีข้อมูลที่จะอัพเดทหรือไม่
        if (Object.keys(payload).length === 0) {
            return { status: 400, response: {success: false, message: 'No data to update'} };
        }

        // check has zone
        if (zone_id !== undefined) {
            const hasZone = await prisma.zone.findFirst({where: {id: zone_id},select: {id: true}})
            if (!hasZone) {
                return { status: 400, response: {success: false, message: 'Zone not found'} };
            }
        }

        // check has type
        if (type_id !== undefined) {
            const hasType = await prisma.bookType.findFirst({where: {id: type_id},select: {id: true}})
            if (!hasType) {
                return { status: 400, response: {success: false, message: 'Type not found'} };
            }
        }

        // check if the book exists
        const bookExist = await prisma.book.findFirst({
            where: {
                id: id
            },
            select: {
                id: true
            }
        })

        if (!bookExist) {
            return { status: 404, response: {success: false, message: 'Book not found'} };
        }

        // ดึงเวลาปัจจุบัน ของ timezone Asia/Bangkok
        const now = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')

        // อัพเดทข้อมูล
        const book = await prisma.book.update({
            where: {
                id: id
            },
            data: {
                ...payload,
                updatedAt: now,
            }
        })

        return { status: 200, response: {success: true, message: 'update book success', data: book} };

    }

    catch (error) {
        if (error instanceof Error) {
            console.log(error.stack)
        }
        return { status: 500, response: {success: false, message: 'Internal server error'} };
    }

}

export default patchBookService