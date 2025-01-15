import { PrismaClient } from '@prisma/client'


import {z} from 'zod'

const prisma = new PrismaClient()


async function addBookService(req:any) {

    try {
        const schema = z.object({
            title: z.string({message: 'Title is required'}).max(191, "title lenght is more 191 charater"),
            author: z.string().max(191, "title lenght is more 191 charater"),
            description: z.string().max(191, "title lenght is more 191 charater").optional(),
            zone_id: z.number({message: 'Zone is required (int)'}),
            type_id: z.number({message: 'Type is required (int)'}),
        })
    
        const {title, author, description, zone_id, type_id} = schema.parse(req)
    
        if (schema.safeParse(req).success === false) {
            return [400, {success: false, message: schema.safeParse(req).error?.errors[0].message}]
        }

        // Check if the book already exists
        const hasBook = await prisma.book.findFirst({where: {title: title,author: author},select: {id: true}})
        if (hasBook) {
            return [400, {success: false, message: 'Book already exists'}]
        }

        const book = await prisma.book.create({
            data: {
                title: title,
                author: author,
                description: description,
                zone: {
                    connect: { id: zone_id }
                },
                type: {
                    connect: { id: type_id }
                }
            }
        })

        return [200, {success: true, data: book}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}

export default addBookService