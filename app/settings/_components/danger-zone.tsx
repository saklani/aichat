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

export function DangerZone() {
    return (
        <div className="flex flex-col gap-[12px]">
            <h1 className="heading">Danger Zone</h1>
            <div className="flex flex-col border border-red-300 p-[24px] rounded-md gap-[24px] items-start max-w-[400px]">
                <p className="text-sm">Delete account and all associated data</p>
                <DeleteAccount />
            </div>
        </div>
    )
}

export function DeleteAccount() {
    const router = useRouter()
    const { mutate } = useMutation({
        mutationFn: () => fetch("/api/user", { method: "DELETE" }),
        onSuccess: () => router.refresh()
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Delete Account</Button>
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
}
