import { prisma } from "../../prisma/prisma"

interface Sample {
    id: number
    audioUrl: string
    bpm: number | null
    createdAt: Date
    key: string | null
    name: string
    time: number
    type: 'LOOP' | 'ONE_SHOT'
    updatedAt: Date
}

export async function getAllSamples(): Promise<Sample[]> {
    return await prisma.sample.findMany()
}

export async function getSampleById(id: number): Promise<Sample | null> {
    return await prisma.sample.findUnique({
        where: { id }
    })
}

export async function createSample(data: Omit<Sample, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sample> {
    return await prisma.sample.create({
        data
    })
}
