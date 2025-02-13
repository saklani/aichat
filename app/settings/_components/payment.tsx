import { Button } from "@/components/ui/button";

export function Payment() {
    return (
        <div className="flex flex-col items-start gap-[12px]">
            <h1 className="title">Upgrade Plan</h1>
            <ul className="list-disc">
                <li className="text-sm">Get 2000 messages per month</li>
                <li className="text-sm">Upto 5 GB data storage </li>
                <li className="text-sm">Access premium AI models</li>
                <li className="text-sm">Priority Support</li>
            </ul>
            <Button disabled={true}>Coming Soon</Button>
        </div>
    )
}