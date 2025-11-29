import { prisma } from "@/database";
import Link from "next/link";
import { Suspense } from "react";
import { Card }  from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger,  AccordionContent } from "@/components/ui/accordion";
import { getUsername, handleDelete, handleSignout, verifyUser } from "./api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home({ params }: any) {
  const { error } = await params;
  console.log(error);
  const userId = await verifyUser();
  

  return (
    <Suspense fallback={<SkeletonBlocks />}>
      <BlockList userId={userId}/>
    </Suspense>
  )
}

async function BlockList({ userId } : any) {
  const blocks = await prisma.block.findMany({
    where: { userId: Number(userId) }
  });
  const username = await getUsername();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks</h1>
          <Button
            type="button"
            className="inline-block w-fit underline px-4 py-2 text-sm font-medium text-black bg-grey-600 rounded-lg hover:bg-grey-700 transition"//Intended to be white text on grey.
            onClick={handleSignout}
          >Signout</Button>
        </header>
        <h2 className="text-center py-2 text-2xl font-semibold">Welcome {username}</h2>
        {blocks.length === 0 ? (
          <div>
            <Link
              href="/create"
              className="px-4 py-2 w-fit text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >+ Create Block</Link>
            <p className="text-gray-500 italic text-center">
              No blocks yet. Create one to get started!
            </p>
          </div>
        ) : (
          <Card className="w-full p-5">
            <Link
              href="/create"
              className="px-4 py-2 w-fit text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              + Create Block
            </Link>
            <Accordion
              type="single"
              collapsible
          >
            {blocks.map((block) => (
              <AccordionItem key={block.id} value={`item-${block.id}`}>
                  <AccordionTrigger>{block.title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{block.code}</p>
                    <div>
                      <Link className="inline-block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white" href={`edit/${block.id}`}>Edit</Link> <form className="inline-block" action={handleDelete}>
                        <Input
                          id="id"
                          name="id"
                          type="number"
                          value={block.id}
                          hidden
                          readOnly
                        />
                        <Button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >Delete</Button>
                      </form>
                    </div>
                  </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </Card>
        )}
      </div>
    </main>
  );
}

function SkeletonBlocks() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 animate-pulse">
      <div className="max-w-2xl mx-auto">
        {/* Header skeleton */}
        <header className="flex items-center justify-between mb-8">
          <div className="h-8 w-40 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </header>

        {/* List skeleton */}
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="h-5 w-48 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
