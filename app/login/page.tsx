import Link from "next/link";
import { GoogleLogin } from "@/components/auth/google-login";

export default function LoginPage() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <div className="flex flex-col gap-[24px] w-full max-w-sm items-center">
                <div className="bg-gray-100 w-[100px] h-[100px] rounded-full"></div>
                <div className="flex flex-col gap-[8px]">
                    <h1 className="subtitle text-center">Login</h1>
                    <h2 className="muted text-center">Sign in to your account</h2>
                </div>
                <GoogleLogin />
                <p className="info">Don&apos;t have an account? <Link className="text-blue-700 hover:underline" href="/register">Register</Link></p>

            </div>
        </div>
    );
}