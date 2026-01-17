import { NextRequest, NextResponse } from "next/server";
import { createSample, getAllSamples } from "../../services/samples/sampleService";

export async function GET(){
    const samples = await getAllSamples()
    return NextResponse.json(samples)
}

export async function POST(request:NextRequest) {
    try{
        const body = await request.json()
        const sample = await createSample({

            name: body.name,
            type: body.type,
            bpm: body.bpm || null,
            key: body.key || null,
            time: body.time,
            audioUrl: body.audioUrl,
        })

        return NextResponse.json(sample, {status: 201})

    }catch(error){
        console.error(error)
    }
    
}