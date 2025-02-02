"use client"

import { Button } from "@/components/ui/button"
import { logout } from "../actions"
import { useAsyncAction } from "@/hooks/use-async-function";
import { toast } from "sonner";

export function LogoutButton() {
  const { state, handleAction } = useAsyncAction(logout, {
    onError: ({ error }) => toast(error)
  });
  return (
    <Button state={state} variant={"destructive"} onClick={() => handleAction({})}>
      Logout
    </Button>
  )
}
