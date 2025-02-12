"use client"

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/client/queries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter()

  const { mutate, status, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.refresh(),
    onError: (error) => toast(error.message)
  });

  return (
    <Button variant={"destructive"} status={status} disabled={isPending} onClick={() => mutate()}>
      Logout
    </Button>
  )
}
