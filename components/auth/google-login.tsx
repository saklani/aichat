"use client"
import { GoogleLogo, CircleNotch } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/client/auth"
import { useState } from "react"

export function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <Button
      onClick={handleClick}
      className="gap-2 w-full max-w-xs"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <CircleNotch className="animate-spin" /> : <GoogleLogo />}
      <span>Continue with Google</span>
    </Button>
  )
} 