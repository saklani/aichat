"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { upload } from "./_action"
import { formSchema } from "./form-schema"



export function FileUpload() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })
    async function onSubmit(values: { file: File | undefined }) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (values.file)
            await upload(values.file)

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="file"
                    control={form.control}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Picture</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    placeholder="Picture"
                                    type="file"
                                    onChange={(event) =>
                                        onChange(event.target.files && event.target.files[0])
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Upload</Button>
            </form>
        </Form>
    )
}