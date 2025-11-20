'use client'
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default async function EditBlock({params,
}: {
    params: Promise<{ id: number }>
}) {
    const [blockId, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const getBlock = async () => {
        const { id } = await params;
        setId(id);
        const response = await fetch(`/api/get/${id}`);
        if(response.ok) {
            console.log("Block updated")
        } else {
            const errorData = await response.json();
            console.log(errorData.error);
        }
    }
    getBlock();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/edit/${blockId}/route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, code}),
        });
        if(response.ok){
            console.log("Block edited");
            redirect(`/blocks/${blockId}`);
        } else {
            const errorData = await response.json();
            console.log(errorData.error);
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
    }

    return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks <span className="text-neutral-600">\ {blockId} \ Edit</span></h1>
            <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Go back Home
            </Link>
        </header>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <textarea
                className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
                value={code}
                onChange={handleCodeChange}
            ></textarea>
            <div className="mt-3">
            <Link className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition" href={`blocks/${blockId}`}>Cancel</Link> <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition" disabled={!title || !code}>Save</button>
            </div>
        </form>
      </div>
    </main>
  );
}