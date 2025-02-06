import { randomUUID } from "crypto";
import { Chat } from "./[id]/_components/chat";


export default function Page() {
    const id = randomUUID()
    return (
       <Chat id={id} key={id}/>
    );
}