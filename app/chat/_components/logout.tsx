"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAsyncAction } from "@/hooks/use-async-function";
import { toast } from "sonner";
import { logout } from "./actions";

export function LogoutButton() {
  const { state, handleAction } = useAsyncAction(logout, {
    onError: ({ error }) => toast(error)
  });

  return (
    <DropdownMenuItem className="w-full" disabled={state === "loading"} onClick={handleAction}>
      <span> Logout</span>
    </DropdownMenuItem>
  )
}
