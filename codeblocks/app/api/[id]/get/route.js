import { NextResponse } from "next/server";
import { prisma } from "@/database";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const getBlock = await prisma.block.findUniqueOrThrow({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json({title: getBlock.title, code: getBlock.code}, {status: 200});
    } catch(error) {
        return NextResponse.json({error: "Failed to find block."}, {status: 500});
    }
}
