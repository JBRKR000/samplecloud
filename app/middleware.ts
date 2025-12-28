import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest){
    if (request.nextUrl.pathname.includes("protected")) {}
}
