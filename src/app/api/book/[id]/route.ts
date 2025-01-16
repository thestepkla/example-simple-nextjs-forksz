import { NextResponse , NextRequest } from 'next/server'

import { getBookService } from '@/services/book/get.service'
import deleteBookService from '@/services/book/delete.service'
import patchBookService from '@/services/book/patch.service'

export async function GET(request: NextRequest, {params}: {params: {id: number}}) {
    try {
        const { id } = await params
        const {status,response} = await getBookService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const {status, response} = await deleteBookService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const body = await request.json()
        const {status, response} = await patchBookService(id, body)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}