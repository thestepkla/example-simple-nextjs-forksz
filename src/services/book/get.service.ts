import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getBookService(id:number) {

    try {
        const book = await prisma.book.findFirst({
            where: {
                id: id
            }
        })

        if (!book) {
            return [404, {success: false, message: 'Book not found'}]
        }

        return [200, {success: true, data: book}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}

async function getListBookService() {

    try {
        const book = await prisma.book.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        return [200, {success: true, data: book}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}

export {getBookService, getListBookService}