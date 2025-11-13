import { prisma } from "@/database";
import Link from "next/link";

export default async function ViewBlock({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params;
    const block = await prisma.block.findUniqueOrThrow({
        where: {
            id: Number(id),
        },
    });

    return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks <span className="text-neutral-600">\ {id}</span></h1>
            <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Go back Home
            </Link>
        </header>
            <h2 className="text-2xl">{block.title}</h2>
            <p className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition">{block.code}</p>
            <div className="mt-4">
                <Link className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition" href="/">Delete</Link> <Link className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition" href={`/blocks/${id}/edit`}>Edit</Link>
            </div>
      </div>
    </main>
    );
}