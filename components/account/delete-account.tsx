"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, } from "../ui/card";

export const DeleteAccount = memo(() => (
    <Card>
        <CardHeader className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col items-start gap-2">
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Delete account and all associated data</CardDescription>
            </div>
            <DeleteAlert />
        </CardHeader>
    </Card>
))

DeleteAccount.displayName = "DeleteAccount"

const DeleteAlert = memo(() => {
    const router = useRouter()
    const { mutate } = useMutation({
        mutationFn: () => fetch("/api/user", { method: "DELETE" }),
        onSuccess: () => {
            router.replace("/")
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="mt-4 ml-1" variant={"destructive"}>Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => mutate()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})

DeleteAlert.displayName = "DeleteAlert"