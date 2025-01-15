import { NextRequest, NextResponse } from "next/server";

import { getZoneService } from "@/services/zone/get.service";
import deleteZoneService from "@/services/zone/delete.service";
import patchZoneService from "@/services/zone/patch.service";


export async function GET({params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const {status,response} = await getZoneService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function DELETE({params}: {params: Promise<{id: number}>}) {
    try {
        const { id } = await params
        const {status, response} = await deleteZoneService(id)

        return NextResponse.json(response, { status: status })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try{
        const { id } = await params
        const body = await request.json()
        const {status, response} = await patchZoneService(id, body)

        return NextResponse.json(response, { status: status })
    }
    catch(error){
        console.log(error)
        return NextResponse.json({success: false, message: 'Internal server error'}, { status: 500 })
    }
}