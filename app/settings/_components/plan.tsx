"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { GetPlan } from "@/lib/client/types"
import { useQuery } from "@tanstack/react-query"

export function Plan() {
    const { data: response } = useQuery<GetPlan>({
        queryKey: ["plan"],
        queryFn: () => fetch("/api/plan").then(res => res.json())
    })

    const usage = response?.data.messageUsage ?? 0
    const limit = response?.data.messageLimit ?? 0
    return (
        <Card className="w-full">
            <CardHeader className="gap-[12px] items-start">
                <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-[12px] items-start">
                <Badge className="flex justify-center items-center h-[20px] w-[45px]" variant={"outline"}>{response?.data.type}</Badge>
                <Progress value={usage / limit} />
                <div className="flex w-full justify-end">
                    {
                        !response?.data?
                        <p className="text-xs text-gray-500">-/-</p>:
                        <p className="text-xs text-gray-500">{usage}/{limit}</p>
                    }
                </div>
                <CardDescription className="font-semibold">Resets on 28 February</CardDescription>
            </CardContent>
        </Card>
    )

}