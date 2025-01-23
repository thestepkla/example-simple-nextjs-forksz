import { PrismaClient } from "@prisma/client";

import moment from "moment-timezone";

import {z} from 'zod'

const prisma = new PrismaClient()

async function addZoneService(req:any) {
    
    try {
        const schema = z.object({
            name: z.string({message: 'Name is required'}).max(191, "name length is more 191 charater"),
            description: z.string().max(191, "description length is more 191 charater").optional()
        });
    
        if (schema.safeParse(req).success === false) {
            return {status: 400, response: {success: false, message: schema.safeParse(req).error?.errors[0].message}};
        }

        const {name, description} = schema.parse(req);

        // ดึงเวลา จาก timezone ปัจจุบัน
        const now = moment().tz('Asia/Bangkok').format();

        const zone = await prisma.zone.create({
            data: {
                name: name,
                description: description,
                createdAt: now
            }
        });

        return {status: 200, response: {success: true, message: 'add zone success', data: zone}};
    } catch (error) {
        console.log(error);
        return {status: 500, response: {success: false, message: 'Internal server error'}};
    }
    
}

export default addZoneService;