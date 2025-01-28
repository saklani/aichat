import { LoginForm } from '@/components/login/components';
import { Suspense } from 'react';

export default async function LoginPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <LoginForm />
        </Suspense>
    );
}