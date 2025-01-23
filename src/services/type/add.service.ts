    import { PrismaClient } from "@prisma/client";

    import moment from "moment-timezone";

    import {z} from 'zod'

    const prisma = new PrismaClient()

    async function addTypeService(req:any) {

        try {
            if (req === null || req === undefined) {
                return {status: 400, response: {success: false, message: 'Request is required'}};
            }

            const schema = z.object({
                name: z.string({message: 'Name is required'}).max(191, "name length is more 191 charater"),
            });
        
            if (schema.safeParse(req).success === false) {
                return {status: 400, response: {success: false, message: schema.safeParse(req).error?.errors[0].message}};
            }

            const {name} = schema.parse(req);

            // ดึงเวลา จาก timezone ปัจจุบัน
            const now = moment().tz('Asia/Bangkok').format();

            if (name === undefined) {
                return {status: 400, response: {success: false, message: 'Name is required'}};
            }

            if (now === undefined || now === null) {
                return {status: 400, response: {success: false, message: 'Date is required'}};
            }

            const type = await prisma.bookType.create({
                data: {
                    name: name,
                    createdAt: now
                }
            });

            console.log('name', name);


            return {status: 200, response: {success: true, message: 'add type success', data: type}};
        } catch (error) {
            if (error instanceof Error){
                console.log("Error: ", error.stack)
            }
            return {status: 500, response: {success: false, message: 'Internal server error'}};
        }
        
    }

    export default addTypeService;