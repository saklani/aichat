"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => fetch("/api/auth/logout", { method: "POST" }),
    onSuccess: () => router.refresh(),
    onError: (error) => toast(error.message)
  });

  return (
    <DropdownMenuItem className="w-full" disabled={isPending} onClick={() => mutate()}>
      <span> Logout</span>
    </DropdownMenuItem>
  )
}
