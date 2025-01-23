import { NextRequest, NextResponse } from "next/server";

import { getListTypeService } from "@/services/type/get.service";
import addTypeService from "@/services/type/add.service";

export async function GET(request: NextRequest) {
    try {
        const {status, response} = await getListTypeService()

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {status, response} = await addTypeService(body)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}