import { RegisterCard } from './_components/register-card';
import { Suspense } from 'react';

export default async function RegisterPage() {
    return (
        <div className="flex w-full h-screen justify-end items-center">
            <RegisterCard />
        </div>
    );
}