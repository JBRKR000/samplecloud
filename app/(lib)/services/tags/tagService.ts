import { prisma } from "../../prisma/prisma"

interface Tag {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    userId: string
}

export async function getAllTags(userId: string): Promise<Tag[]> {
    return await prisma.tag.findMany({
        where: { userId: userId }
    })
}

export async function getTagById(id: number): Promise<Tag | null> {
    return await prisma.tag.findUnique({
        where: { id }
    })
}

export async function createTag(data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tag> {
    return await prisma.tag.create({
        data
    })
}

export async function updateTag(id: number, name: string): Promise<Tag> {
    return await prisma.tag.update({
        where: { id },
        data: { name }
    })
}

export async function deleteTag(id: number): Promise<Tag> {
    return await prisma.tag.delete({
        where: { id }
    })
}
