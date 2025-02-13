import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { ProviderLogin } from "@/components/login-provider"
import { ProviderDataGoogle } from "@/components/google-data"

export function RegisterCard() {
    return (
        <Card className="flex flex-col items-stretch w-full max-w-[360px] justify-between">
            <CardHeader className="mt-[16px] items-center">
                <h1 className="title">Register</h1>
                <h2 className="subtitle">Create your account</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 items-stretch py-6">
                <ProviderLogin provider="google">
                    <ProviderDataGoogle />
                </ProviderLogin>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="info">Already have an account? <Link className="text-blue-700 hover:underline" href="/login">Login</Link></p>
            </CardFooter>
        </Card>
    )
}