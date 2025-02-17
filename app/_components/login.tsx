import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export async function Login() {
    return (
        <form action={async() => { 
            "use server"
            redirect("/login")
        }}>
            <Button variant={"outline"} type="submit">
                Login
            </Button>
        </form>
    )
}