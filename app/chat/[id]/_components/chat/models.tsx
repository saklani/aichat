"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GetUserPreferences } from "@/lib/client/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import * as React from "react"

const openaiModels = [
  {
    value: "gpt-4o-mini",
    label: "GPT-4o-mini",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
  },
]


export function SwitchModels() {
  const { data: response } = useQuery<GetUserPreferences>({ queryKey: ["preferences"], queryFn: () => fetch("/api/user/preferences").then(res => res.json()) })

  if (!response?.data) {
    return <></>
  }
  return <ModelComboBox defaultModel={response?.data.defaultModel} />
}

const ModelComboBox = React.memo(function ({ defaultModel }: { defaultModel: string }) {
  const { mutate } = useMutation({
    mutationKey: ["preference"],
    mutationFn: (defaultModel: string) => fetch("/api/user/preferences", { method: "PUT", body: JSON.stringify({ defaultModel }) })
  })

  const [value, setValue] = React.useState(defaultModel)
  const handleModelChange = React.useCallback((modelValue: string) => {
    if (modelValue !== value) {
      mutate(modelValue)
      setValue(modelValue)
    }
  }, [value, mutate])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[120px]" variant={"outline"}>
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-[250px]">
        <DropdownMenuLabel>Models</DropdownMenuLabel>
        {openaiModels.map(model =>
          <DropdownMenuItem
            key={model.value}
            className={model.value === value ? "my-1 bg-foreground/30" : ""}
            onClick={() => handleModelChange(model.value)}>
            {model.label}
          </DropdownMenuItem>)
        }
        <DropdownMenuItem disabled>DeepSeek R1</DropdownMenuItem>
        <DropdownMenuItem disabled>Claude 3.5 Sonnet</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ModelComboBox.displayName = "ModelComboBox"