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
import { login } from "@/lib/client/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { formSchema } from "./form-schema"
import { useCallback, useMemo } from "react"


const FORGOT_PASSWORD_URL = "/forgot-password"

export function LoginForm() {
  const router = useRouter()
  const { mutate, status } = useMutation({
    mutationFn: login,
    onSuccess: () => router.refresh(),
    onError: (error) => toast(error.message)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  const memoizedFormState = useMemo(() => form.formState, [form.formState]);

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    mutate(values);
  }, [mutate]);

  const renderEmailField = useCallback(({ field }: { field: ControllerRenderProps<{ email: string; password: string }, "email"> }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ), []);

  const renderPasswordField = useCallback(({ field }: { field: ControllerRenderProps<{ email: string; password: string }, "password"> }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input type="password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ), []);

  return (
    <Form {...form} formState={memoizedFormState}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-md">
        <div className="flex flex-col gap-[12px] h-[180px]">
          <FormField
            control={form.control}
            name="email"
            render={renderEmailField}
          />
          <div className="flex flex-col gap-[4px]">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => renderPasswordField({ field })}
            />
            <a className="text-xs text-blue-500 hover:underline" href={FORGOT_PASSWORD_URL}>Forgot Password?</a>
          </div>
        </div>
        <Button status={status} type="submit">
          Login
        </Button>
      </form>
    </Form>
  )
}
