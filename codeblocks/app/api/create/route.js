import { NextResponse } from "next/server";
import { prisma } from "@/database";

export async function POST(request) {
    const {title, code} = await request.json();

    try {
        const newBlock = await prisma.block.create({
            data: {
                title: title,
                code: code,
            }
        });
        return NextResponse.json(newBlock, {status: 200});
    } catch(error) {
        return NextResponse.json({error: "Failed to create new block"}, {status: 500});
    }
}