import { NextRequest, NextResponse } from "next/server";

import { getTypeService } from "@/services/type/get.service";
import deleteTypeService from "@/services/type/delete.service";
import patchTypeService from "@/services/type/patch.service";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const {status,response} = await getTypeService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const {status, response} = await deleteTypeService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const body = await request.json()
        const {status, response} = await patchTypeService(id, body)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}