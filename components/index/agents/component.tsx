import { use } from "react";
import { getAgents } from "./action";
import { schema } from "@/lib/db";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export function Agents() {
    const agents = use(getAgents())

    // 2. Define a submit handler.
    return (
        <div className="flex flex-col w-full gap-[7px]">
            {agents.map(({ agent, model }) => <AgentCard agent={agent} model={model} />)}
        </div>
    )
}


function AgentCard({ agent, model }: { agent: schema.Agent; model: schema.Model }) {
    return (
        <Link href={`/chat/${agent.id}`}>
            <Card className="hover:bg-primary/10 cursor-pointer" key={agent.id}>
                <CardHeader>
                    <CardTitle>{agent.name}</CardTitle>
                    <CardDescription>{model.name}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}