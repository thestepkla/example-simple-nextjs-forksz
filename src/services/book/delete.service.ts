import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteBookService(id:number) {

    try {
        //check book exist
        const bookExist = await prisma.book.findFirst({
            where: {id: id},select: {id: true}
        })

        if (!bookExist) {
            return {status: 404, response: {success: false, message: 'Book not found'}}
        }

        const book = await prisma.book.delete({
            where: {id: id}
        })

        return {status: 200, response: {success: true, message: 'delete book success', data: book}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
    
}

export default deleteBookService