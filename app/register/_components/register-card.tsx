import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { RegisterForm } from "./register-form"

export function RegisterCard() {
    return (
        <Card className="flex flex-col w-full h-[calc(100vh-128px)] py-[12px] max-w-md justify-between">
            <CardHeader className="mt-[24px]">
                <h1 className="title">Register</h1>
                <h2 className="subtitle mb-[24px]">Create your account</h2>
            </CardHeader>
            <CardContent className="h-[350px]">
                <RegisterForm />
            </CardContent>
            <CardFooter>
                <p className="info max-w-md w-full">Already have an account? <Link className="text-blue-700 hover:underline" href="/login">Login</Link></p>
            </CardFooter>
        </Card>
    )
}