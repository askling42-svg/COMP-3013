import { NextResponse } from "next/server";
import { prisma } from "@/database";

export async function GET(request, params) {
    const { id } = params;

    try {
        const deleteBlock = await prisma.block.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(deleteBlock, {status: 200});
    } catch(error) {
        return NextResponse.json({error: "Failed to delete block"}, {status: 500});
    }
}