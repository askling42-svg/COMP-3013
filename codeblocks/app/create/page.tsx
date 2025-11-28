import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleCreate, handleSignout, verifyUser } from "../api";

export default async function CreateBlock() {
  const userId = await verifyUser();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Code Blocks</h1>
            <Button
              className="inline-block px-4 py-2 text-sm font-medium text-black bg-grey-600 rounded-lg hover:bg-grey-700 transition"
              onClick={handleSignout}
            >Signout</Button>
        </header>
        <Card className="w-full p-5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action={handleCreate}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <textarea
                  id="code"
                  name="code"
                  className="px-4 py-2 mt-3 w-full bg-white border border-grey shadow-sm hover:shadow-md transition"
                  required
                ></textarea>
              </div>

              <div>
                <Link href="/"
                  className="inline-block px-4 py-2 text-sm rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white"
                >Cancel</Link> <Button
                  type="submit"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
                >Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
