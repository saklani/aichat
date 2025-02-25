import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { GoogleLogin } from "@/components/auth/google-login"

export default function RegisterPage() {
    return (
        <div className="flex w-full h-screen justify-center items-center p-[24px]">
            <div className="flex flex-col gap-[24px] w-full max-w-sm items-center">
                <div className="bg-gray-100 w-[100px] h-[100px] rounded-full"></div>
                <div className="flex flex-col gap-[8px]">
                    <h1 className="subtitle text-center">Register</h1>
                    <h2 className="muted text-center">Create your account</h2>
                </div>
                <GoogleLogin />
                <p className="info">Already have an account? <Link className="text-blue-700 hover:underline" href="/login">Login</Link></p>
            </div>
        </div>
    );
}