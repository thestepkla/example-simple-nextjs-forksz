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
            return {status: 404, response: {success: false, message: 'Book not found'}}
        }

        return {status: 200, response: {success: true, data: book}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
    
}

async function getListBookService() {

    try {
        const book = await prisma.book.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        return {status: 200, response: {success: true, message:'get list book success', data: book}}
    } catch (error) {
        console.log(error)

        return { status:500, response: {success: false, message: 'Internal server error'} };
    }
    
}

export {getBookService, getListBookService}