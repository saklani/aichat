"use client"
import { GoogleLogo } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { authClient } from "@/lib/client/auth"
import { useRouter } from "next/navigation"
export function GoogleLogin() {
  return (
    <Button onClick={() => authClient.signIn.social({ provider: "google"})} className="gap-2 w-full" type="submit">
      <GoogleLogo />
      <span>Continue with Google</span>
    </Button>
  )
} 