"use client"
import { signOut } from "@/lib/client/auth"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export function Logout() {
  const router = useRouter()
  return (
      <Button onClick={() => signOut({}, {
        onSuccess(ctx) {
            router.push("/login")
        }
      })} variant={"destructive"} type="submit">Logout</Button>
   
  )
}