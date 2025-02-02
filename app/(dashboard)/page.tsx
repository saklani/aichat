import { getChats } from "./actions"
import { use } from "react"


export default function Page() {
  const chats = use(getChats())

   return (
    <ul>
      {chats?.map((c) => <a key={c.id} href={`/chat/${c.id}`}>{c.id}</a>)}
    </ul>
   );
}
