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
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { upload } from "./_action"
import { formSchema } from "./form-schema"


export function FileUpload() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })
    async function onSubmit(values: { file: File | undefined }) {
        if (values.file)
            await upload(values.file)

    }
    return (
        <Dialog>
            <DialogTrigger asChild><Button>Add a file</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a new file</DialogTitle>
                </DialogHeader>
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
                        <DialogClose asChild>
                            <Button type="submit">Upload</Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}