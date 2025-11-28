import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleLogin } from "../api";

export default async function LoginPage({ params }: any) {
  const { error } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
  if(userId !== undefined) {redirect("/")}
  return (
    <Card className="w-full max-w-md mx-auto my-20">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        { error && <h1>Something went wrong!</h1> }
        <form className="space-y-4" action={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        </form>
        <div className="text-center">
          <Link
            href="/signup"
            className="underline px-4 py-2 text-blue-600 hover:text-blue-700"
          >Sign-Up</Link>
        </div>
      </CardContent>
    </Card>
  );
}
