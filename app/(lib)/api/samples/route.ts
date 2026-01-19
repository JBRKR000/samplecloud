import { NextRequest, NextResponse } from "next/server";
import { createSample, getAllSamples } from "../../services/samples/sampleService";
import { auth } from "@/auth";

export async function GET(request: NextRequest){
    const session = await auth.api.getSession({headers: request.headers})
    const samples = await getAllSamples(session?.user.id!)
    return NextResponse.json(samples)
}

export async function POST(request:NextRequest) {
    try{
        const session = await auth.api.getSession({headers: request.headers})
        const body = await request.json()
        const sample = await createSample({
            name: body.name,
            type: body.type,
            bpm: body.bpm || null,
            key: body.key || null,
            time: body.time,
            audioUrl: body.audioUrl,
            userId: session?.user.id!
        })
        return NextResponse.json(sample, {status: 201})

    }catch(error){
        console.error(error)
    }
    
}