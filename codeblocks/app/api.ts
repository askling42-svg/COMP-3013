"use server";
import { prisma } from "@/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifyUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    if(!userId) {redirect("/login")}
    return userId;
}

export async function getUsername() {
    const userId = await verifyUser();
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: Number(userId) }
        });
        return user.username;
    } catch(error: unknown) {
        if(error instanceof Error){
            redirect(`/?error=${error.message}`);
        }
        const message = "Undefined Error";
        redirect(`/?error=${message}`);
    }
}

export async function handleCreate(formData: FormData) {
    try {
        const userId = await verifyUser();

        const title = formData.get("title") as string;
        const code = formData.get("code") as string;
        const block = await prisma.block.create({ data: { title, code, userId: Number(userId) } });
        redirect("/");
    } catch(error: unknown) {
        if(error instanceof Error){
            redirect(`/create?error=${error.message}`);
        }
        const message = "Undefined Error";
        redirect(`/create?error=${message}`);
    }
}

export async function handleEdit(formData: FormData) {
    try {
        const userId = await verifyUser();

        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        const editBlock = await prisma.block.update({
            where: { id: Number(id), userId: Number(userId) },
            data: { title, code }
        });
        redirect("/");
    } catch(error: unknown) {
        if(error instanceof Error){
            redirect(`/?error=${error.message}`);
        }
        const message = "Undefined Error";
        redirect(`/?error=${message}`);
    }
}

export async function handleDelete(formData: FormData) {
    const userId = await verifyUser();

    const id = formData.get("id") as string;
    try {
        const deleted = await prisma.block.delete({
            where: { id: Number(id) }
        })
    } catch(error: unknown) {
        redirect("/");
    }
}

export async function handleLogin(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
        const foundUser = await prisma.user.findUniqueOrThrow({
            where: { username, password }
        });
        if(!foundUser) {redirect("/login");}
        else {
            (await cookies()).set("user_id", String(foundUser.id));
            redirect("/");
        }
    } catch(error: unknown) {
        if(error instanceof Error){
            redirect(`/signup?error=${error.message}`);
        }
        const message = "Undefined Error";
        redirect(`/signup?error=${message}`);
    }
}

export async function handleSignup(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;
    if(password !== confirm) {
        const message = "Password doesn't match";
        redirect(`/signup?error=${message}`);
    }
    try {
        const newUser = await prisma.user.create({
            data: { username, password }
        });
        const foundUser = await prisma.user.findUniqueOrThrow({
            where: { username, password }
        });
        if(!foundUser) {redirect("/login");}
        else {
            (await cookies()).set("user_id", String(foundUser.id));
            redirect("/");
        }
    } catch(error: unknown) {
        if(error instanceof Error){
            redirect(`/signup?error=${error.message}`);
        }
        const message = "Undefined Error";
        redirect(`/signup?error=${message}`);
    }
}

export async function handleSignout() {
    const cookieStore = await cookies();
    (await cookieStore).delete("user_id");
    redirect("/login");
}