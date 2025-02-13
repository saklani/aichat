import { Button } from "@/components/ui/button";

export function Payment() {
    return (
        <div className="flex flex-col items-start gap-2">
            <h1 className="title">Upgrade Plan</h1>
            <ul className="list-disc p-4">
                <li className="text-sm">Get 2000 messages per month</li>
                <li className="text-sm">Upto 5 GB data storage </li>
                <li className="text-sm">Access to premium AI models</li>
                <li className="text-sm">Priority Support</li>
            </ul>
            <Button disabled={true}>Coming Soon</Button>
        </div>
    )
}