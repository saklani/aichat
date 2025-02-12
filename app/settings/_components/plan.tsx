"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Plan } from "@/lib/client/types"
import { useQuery } from "@tanstack/react-query"

export function Plan() {
    const { data: plan } = useQuery<Plan>({
        queryKey: ["plan"],
        queryFn: () => fetch("/api/plan").then(res => res.json())
    })

    const usage = plan?.message_usage ?? 0
    const limit = plan?.message_limit ?? 0

    return (
        <Card className="w-full">
            <CardHeader className="gap-[12px] items-start">
                <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-[12px] items-start">
                <Badge variant={"outline"}>{plan?.name} Plan</Badge>
                <Progress value={usage / limit} />
                <div className="flex w-full justify-end">
                    <p className="text-xs text-gray-500">{usage}/{limit}</p>
                </div>
                <CardDescription className="font-semibold">Resets on 28 February</CardDescription>
            </CardContent>
        </Card>
    )
}