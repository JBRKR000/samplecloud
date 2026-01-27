import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/(lib)/prisma/prisma";
import { auth } from "@/auth";

// POST - Add tag to sample
// DELETE - Remove tag from sample
export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const body = await request.json()
        const { sampleId, tagId } = body

        // Verify user owns both sample and tag
        const sample = await prisma.sample.findFirst({
            where: { id: sampleId, userId: session?.user.id! }
        })
        
        const tag = await prisma.tag.findFirst({
            where: { id: tagId, userId: session?.user.id! }
        })

        if (!sample || !tag) {
            return NextResponse.json({ error: "Sample or tag not found" }, { status: 404 })
        }

        // Add tag to sample
        const updatedSample = await prisma.sample.update({
            where: { id: sampleId },
            data: {
                tags: {
                    connect: { id: tagId }
                }
            },
            include: { tags: true }
        })

        return NextResponse.json(updatedSample, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to add tag to sample" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const body = await request.json()
        const { sampleId, tagId } = body

        // Verify user owns the sample
        const sample = await prisma.sample.findFirst({
            where: { id: sampleId, userId: session?.user.id! }
        })

        if (!sample) {
            return NextResponse.json({ error: "Sample not found" }, { status: 404 })
        }

        // Remove tag from sample
        const updatedSample = await prisma.sample.update({
            where: { id: sampleId },
            data: {
                tags: {
                    disconnect: { id: tagId }
                }
            },
            include: { tags: true }
        })

        return NextResponse.json(updatedSample, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to remove tag from sample" }, { status: 500 })
    }
}
