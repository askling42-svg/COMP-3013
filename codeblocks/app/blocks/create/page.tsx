import Link from "next/link";

export default function CreateBlock() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks <span className="text-neutral-600">\ Create</span></h1>
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
              className="px-4 py-2 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
              type="text"
              placeholder="Block Title"
            />
          </div>
          <textarea
            className="px-4 py-2 mt-3 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition"
            placeholder="your code goes here..."
          ></textarea>
          <button className="px-4 py-2 mt-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Create</button>
        </form>
      </div>
    </main>
  );
}
