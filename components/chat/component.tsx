"use client"

import { useChat } from 'ai/react';
import { Sparkles } from 'lucide-react';
import { Textarea } from '../ui/textarea';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createChatFormSchema, formSchema } from "./form-schema"

import { toast } from "sonner"

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

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col rounded w-full gap-[8px] h-[calc(100vh-8px)] p-[8px]">
      <div className="border border-black rounded flex flex-col p-[24px] h-[calc(100vh-98px)] overflow-y-scroll">
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




export function CreateChat() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof createChatFormSchema>>({
        resolver: zodResolver(createChatFormSchema),
        defaultValues: {
            name: "",
            description: "",
            fileIds: [],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof createChatFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
      
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    )
}
