import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export function Logout() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirect: true, redirectTo: "/"})
      }}
    >
      <Button variant={"destructive"} type="submit">Logout</Button>
    </form>
  )
}