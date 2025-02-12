"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className={`flex flex-col min-h-screen`}>
            {/* HEADER / NAVBAR */}
            <header className="w-full border-b">
                <div className="mx-auto max-w-5xl flex items-center justify-between py-4 px-6">
                    <Link href="/">
                        <span className="text-lg font-semibold">multichat</span>
                    </Link>
                    <div className="flex gap-2">
                        <Button onClick={() => router.push("/register")}>Get Started</Button>
                        <Button variant={"outline"} onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="mx-auto max-w-3xl flex flex-col items-center justify-center text-center py-16 px-4 gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="title font-semibold leading-tight">
                        Find any information you need in minutes
                    </h1>
                    <p className="text-gray-600 text-sm max-w-2xl">
                        An open-source interface for all your AI chats and data.
                    </p>
                </div>
                <Button size={"lg"} onClick={() => router.push("/register")}>
                    Get Started
                </Button>
            </section>

            {/* FEATURE CARDS */}
            <section className="mx-auto max-w-3xl px-6 py-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Completely Open Source</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">
                            Retain full control of your data with a fully open-source platform. No lock-in, no hidden code.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Stay Organized</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">
                            Keep all chats and references together—no more scattered notes or confusion across multiple apps.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Bring Your Data  <span className="text-xs text-gray-500">(Coming Soon)</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">
                            Consolidate data from S3, Google Drive, Notion, Dropbox, and more—all in a single hub for easy access.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>RAG as a Service <span className="text-xs text-gray-500">(Coming Soon)</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">
                            Leverage Retrieval-Augmented Generation to query vast documents with minimal effort. Stay tuned for updates!
                        </p>
                    </CardContent>
                </Card>

            </section>


            {/* FOOTER */}
            <footer className="mt-auto w-full border-t bg-white">
                <div className="mx-auto max-w-5xl py-4 px-6 flex items-center justify-between text-sm text-gray-500">
                    <p>© 2023 Multichat. All rights reserved.</p>
                    <nav className="flex gap-4">
                        <Link href="/terms" className="hover:text-gray-700">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-gray-700">
                            Privacy
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
