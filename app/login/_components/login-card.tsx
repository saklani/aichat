import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "./login-form";

export function LoginCard() {
    return (
        <Card className="flex flex-col w-full h-[calc(100vh-128px)] py-[12px] max-w-md justify-between">
            <CardHeader className="mt-[24px]">
                <h1 className="title">Login</h1>
                <h2 className="subtitle mb-[24px]">Sign in to your account</h2>
            </CardHeader>
            <CardContent className="h-[350px]">
                <LoginForm/>
            </CardContent>
            <CardFooter>
                <p className="info max-w-md w-full">Don&apos;t have an account? <Link className="text-blue-700 hover:underline" href="/register">Register</Link></p>
            </CardFooter>
        </Card>
    )
}