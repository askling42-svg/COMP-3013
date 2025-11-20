'use client'
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ViewBlock({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const [blockId, setId] = useState(0)
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const getBlock = async () => {
        const { id } = await params;
        setId(id);
        const response = await fetch(`/api/get/${id}`);
        if(response.ok) {
            const data = await response.json();
            setTitle(data.title);
            setCode(data.code);
        } else {
            const errorData = await response.json();
            console.log(errorData.error);
        }
    }
    getBlock();

    const handleDelete = async () => {
        const response = await fetch(`api/delete/${blockId}`);
        if(response.ok) {
            redirect("/");
        } else {
            const errorData = await response.json();
            console.log(errorData.error);
        }
    }

    return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks <span className="text-neutral-600">\ {blockId}</span></h1>
            <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Go back Home
            </Link>
        </header>
            <h2 className="text-2xl">{title}</h2>
            <p className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition">{code}</p>
            <div className="mt-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition" onClick={handleDelete}>Delete</button> <Link className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition" href={`/blocks/${blockId}/edit`}>Edit</Link>
            </div>
      </div>
    </main>
    );
}