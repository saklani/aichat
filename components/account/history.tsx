import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function History() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start gap-2">
                    <CardTitle>Chats</CardTitle>
                    <CardDescription>Export your message history</CardDescription>
                </div>
                <Button className="w-[200px] mt-4" disabled>Export Chats</Button>
            </CardHeader>
        </Card>
    )

}