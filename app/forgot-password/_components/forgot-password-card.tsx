import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordCard() {
    return (
        <Card className="flex flex-col w-full h-[calc(100vh-128px)] py-[12px] max-w-md justify-between">
            <CardHeader className="mt-[24px]">
                <h1 className="title">Forgot Password</h1>
                <h2 className="subtitle mb-[24px]">Send a reset link to your email</h2>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ForgotPasswordForm />
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}