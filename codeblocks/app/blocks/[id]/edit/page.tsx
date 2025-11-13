import { prisma } from "@/database";
import Link from "next/link";

export default async function EditBlock({params,
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
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks <span className="text-neutral-600">\ {id} \ Edit</span></h1>
            <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Go back Home
            </Link>
        </header>
        <form>
            <div>
                <input
                    className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
                    type="text"
                    value={block.title}
                    readOnly
                />
            </div>
            <textarea
                className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
                value={block.code}
            ></textarea>
            <div className="mt-3">
            <Link className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition" href={`blocks/${block.id}`}>Cancel</Link> <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Save</button>
            </div>
        </form>
      </div>
    </main>
  );
}