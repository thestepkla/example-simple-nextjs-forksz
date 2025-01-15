import { NextResponse , NextRequest } from 'next/server'

import { getListBookService } from "@/services/book/get.service";
import addBookService from "@/services/book/add.service";


export async function GET(request: NextRequest) {
    try {
        const {status, response} = await getListBookService()

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {status, response} = await addBookService(body)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}