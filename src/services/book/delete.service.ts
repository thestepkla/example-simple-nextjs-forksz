import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteBookService(id:number) {

    try {
        //check book exist
        const bookExist = await prisma.book.findFirst({
            where: {id: id},select: {id: true}
        })

        if (!bookExist) {
            return [404, {success: false, message: 'Book not found'}]
        }

        const book = await prisma.book.delete({
            where: {id: id}
        })

        return [200, {success: true, data: book}]
    } catch (error) {
        console.log(error)
        return [500, {success: false, message: 'Internal server error'}]
    }
    
}

export default deleteBookService