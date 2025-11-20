import { NextResponse } from "next/server";
import { prisma } from "@/database";

export async function POST(request, { params }) {
    const { id } = await params;
    const {title, code} = await request.json();

    try {
        const editBlock = await prisma.block.update({
            where: {
                id: Number(id),
            },
            data: {
                title: title,
                code: code,
            }
        });
        return NextResponse.json(editBlock, {status: 200});
    } catch(error) {
        return NextResponse.json({error: "Failed to create new block"}, {status: 500});
    }
}