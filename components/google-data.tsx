"use client"
import { GoogleLogo } from "@phosphor-icons/react"
import { Button } from "./ui/button"
export function ProviderDataGoogle() {
  return (
    <Button className="gap-2 w-full" type="submit">
      <GoogleLogo />
      <span>Continue with Google</span>
    </Button>
  )
} 