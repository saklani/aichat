import { Chat } from "./_components/chat";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <Chat id={id} />
    );
}