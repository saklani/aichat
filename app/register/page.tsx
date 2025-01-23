import { RegisterForm } from '@/components/register/client-component';
import { Suspense } from 'react';

export default async function RegisterPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <RegisterForm />
        </Suspense>
    );
}