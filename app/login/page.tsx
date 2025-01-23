import { LoginForm } from '@/components/login/client-component';
import { Suspense } from 'react';

export default async function LoginPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <LoginForm />
        </Suspense>
    );
}