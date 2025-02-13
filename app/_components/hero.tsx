import { auth } from "@/auth";
import { Dashboard } from "./dashboard";
import { GetStarted } from "./get-started";

export async function Hero() {
    const session = await auth()
    return (
        <section className="mx-auto max-w-3xl flex flex-col items-center justify-center text-center py-16 px-4 gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="title font-semibold leading-tight">
                    Find any information you need in minutes
                </h1>
                <p className="text-gray-600 text-sm max-w-2xl">
                    An open-source interface for all your AI chats and data.
                </p>
            </div>
            {session ? <Dashboard/>: <GetStarted/>}
        </section>
    )
}