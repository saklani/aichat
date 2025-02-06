import { Chat } from "./_components/chat";
import { getChat } from "./actions";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const initialMessages = await getChat({ id })
    return (
        <Chat id={id} initialMessages={initialMessages ?? []} />
    );
}