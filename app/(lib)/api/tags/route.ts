import { NextRequest, NextResponse } from "next/server";
import { createTag, getAllTags, deleteTag, updateTag } from "../../services/tags/tagService";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const tags = await getAllTags(session?.user.id!)
        return NextResponse.json(tags)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const body = await request.json()
        const tag = await createTag({
            name: body.name,
            userId: session?.user.id!
        })
        return NextResponse.json(tag, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const body = await request.json()
        const tag = await deleteTag(body.id)
        return NextResponse.json(tag)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: request.headers })
        const body = await request.json()
        const tag = await updateTag(body.id, body.name)
        return NextResponse.json(tag)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to update tag" }, { status: 500 })
    }
}
