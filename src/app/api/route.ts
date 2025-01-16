import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {

    const listMembers = [
        { studentId: "66024xxx", name: "TestAAA" },
        { studentId: "66024xxx", name: "TestCCC" },
        { studentId: "66024xxx", name: "TestBBB" }
    ];

    return NextResponse.json({ message: "GET method called" });

}