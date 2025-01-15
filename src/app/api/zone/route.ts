import { NextRequest, NextResponse } from "next/server";

import { getListZoneService } from "@/services/zone/get.service";

import addZoneService from "@/services/zone/add.service";

export async function GET(request: NextRequest) {
    try {
        const { status, response } = await getListZoneService();

        return NextResponse.json(response, { status: status });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { status, response } = await addZoneService(body);

        return NextResponse.json(response, { status: status });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
