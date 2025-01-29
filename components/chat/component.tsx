"use client"

import { useChat, type Message } from 'ai/react';
import { Sparkles } from 'lucide-react';
import { Textarea } from '../ui/textarea';


function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end w-full">
      <div className="max-w-[500px] border py-[4px] px-[12px] rounded">
        <p>{content}</p>
      </div>
    </div>
  )
}


function AIMessage({ action, content }: { action?: string; content: string; }) {
  return (
    <div className="flex w-full py-[24px] gap-[8px]">
      <div className="border p-[4px] h-[36px]"><Sparkles size={24} /></div>
      <div className="flex flex-col">
        <p className="h-[36px]">{action}</p>
        <p>{content}</p>
      </div>
    </div>
  )
}

export function Chat({ id, initialMessages }: { id: string; initialMessages: Message[] }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id,
    initialMessages,
  });
  return (
    <div className="flex flex-col rounded w-full gap-[8px] h-[calc(100vh-32px)]">
      <div className="border-b flex flex-col p-[24px] h-[calc(100vh-72px)] overflow-y-scroll">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? <UserMessage content={m.content} /> : <AIMessage content={m.content} />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Textarea
          className="h-[64px] w-full border resize-none"
          value={input}
          placeholder="Ask anything"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey == false) {
              e.preventDefault();
              //@ts-ignore
              (e.target.form as HTMLFormElement).requestSubmit();
            }
          }}
        />
      </form>
    </div>
  );
}



