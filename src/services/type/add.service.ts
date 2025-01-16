import { PrismaClient } from "@prisma/client";

import moment from "moment-timezone";

import {z} from 'zod'

const prisma = new PrismaClient()

async function addTypeService(req:any) {

    try {
        const schema = z.object({
            name: z.string({message: 'Name is required'}).max(191, "name lenght is more 191 charater"),
        });
    
        const {name} = schema.parse(req);
    
        if (schema.safeParse(req).success === false) {
            return {status: 400, response: {success: false, message: schema.safeParse(req).error?.errors[0].message}};
        }

        // ดึงเวลา จาก timezone ปัจจุบัน
        const now = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');

        const type = await prisma.bookType.create({
            data: {
                name: name,
               createdAt: now, 
            }
        });

        return {status: 200, response: {success: true, message: 'add type success', data: type}};
    } catch (error) {
        console.log(error);
        return {status: 500, response: {success: false, message: 'Internal server error'}};
    }
    
}

export default addTypeService;