"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { GetPlanResponse } from "@/lib/client/types"
import { useQuery } from "@tanstack/react-query"

export function Usage() {
    const { data: response } = useQuery<GetPlanResponse>({
        queryKey: ["plan"],
        queryFn: () => fetch("/api/plan").then(res => res.json())
    })

   
    const usage = response?.data?.messageUsage ?? 0
    const limit = response?.data?.messageLimit ?? 0
    const date = response?.data?.endDate ? new Date(response.data.endDate) : null
    return (
        <Card className="w-full">
            <CardHeader className="flex-row justify-between">
                <CardTitle>Usage</CardTitle>
                <Badge className="flex justify-center items-center h-[20px] w-[45px]" variant={"outline"}>{response?.data?.type}</Badge>

            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-start mt-2">
                <Progress value={(usage * 100 / limit)} />
                <div className="flex w-full justify-end">
                    {
                        !response?.data ?
                            <p className="text-xs text-gray-500">-/-</p> :
                            <p className="text-xs text-gray-500">{usage}/{limit}</p>
                    }
                </div>
                <CardDescription className="font-semibold">Resets on {date ? date.toLocaleDateString("en-us", {day: "numeric" , month: 'short', year: 'numeric' }): ""}</CardDescription>
            </CardContent>
        </Card>
    )

}