"use client"

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
import { useAsyncAction } from "@/hooks/use-async-function"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgotPassword } from "../actions"
import { formSchema } from "../form-schema"
import { toast } from "sonner"


export function ForgotPasswordForm() {
  const { state, handleAction } = useAsyncAction(forgotPassword, {
   onError: ({ error }) => { console.log(error); toast(error);}
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleAction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-md">
        <div className="flex flex-col gap-[12px] h-[90px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button state={state} type="submit">Send Reset Link</Button>
      </form>
    </Form>
  )
}
