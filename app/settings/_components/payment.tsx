import { Button } from "@/components/ui/button";

export function Payment() {
    return (
        <div className="flex flex-col items-start gap-2">
            <h1 className="title">Upgrade Plan</h1>
            <ul className="list-disc px-4 py-6 text-sm">
                <li>Get 2000 messages per month</li>
                <li>Upto 5 GB data storage </li>
                <li>Access to premium AI models</li>
                <li>Priority Support</li>
            </ul>
            <Button className="w-[200px]" disabled={true}>Coming Soon</Button>
        </div>
    )
}