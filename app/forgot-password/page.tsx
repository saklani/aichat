import { ForgotPasswordCard } from './_components/forgot-password-card';
import { Suspense } from 'react';

export default async function LoginPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <div className="flex w-full h-screen justify-end items-center">
                <ForgotPasswordCard />
            </div>
        </Suspense>
    );
}