import { Chat } from "@/components/chat/component";
import * as actions from "@/lib/actions";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const initialMessages = await actions.getMessagesById(id)
    return (
        <Suspense>
            <Chat id={id} initialMessages={initialMessages} />
        </Suspense>
    );
}