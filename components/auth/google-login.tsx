"use client"  
import { GoogleLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/client/auth"

export function GoogleLogin() {
  return (
    <Button 
      onClick={() => authClient.signIn.social({ provider: "google"})} 
      className="gap-2 w-full max-w-xs" 
      type="submit"
    >
      <GoogleLogo />
      <span>Continue with Google</span>
    </Button>
  )
} 