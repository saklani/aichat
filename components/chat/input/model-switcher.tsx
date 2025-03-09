"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { GetUserPreferencesResponse } from "@/lib/client/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import * as React from "react"

type Model = {
  value: string;
  label: string;
}

const models: Model[] = [
  {
    value: "gpt-4o-mini",
    label: "GPT-4o-mini",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
  },
]


export function ModelSwitcher() {
  const { data: response } = useQuery<GetUserPreferencesResponse>({ queryKey: ["preferences"], queryFn: () => fetch("/api/user/preferences").then(res => res.json()) })

  if (!response?.data) {
    return <></>
  }
  return <ModelComboBox defaultModel={models.find(model => model.value === response?.data.defaultModel) || models[0]} />
}

const ModelComboBox = React.memo(({ defaultModel }: { defaultModel: Model }) => {
  const { mutate } = useMutation({
    mutationKey: ["preference"],
    mutationFn: (defaultModel: string) => fetch("/api/user/preferences", { method: "PUT", body: JSON.stringify({ defaultModel }) })
  })

  const [model, setModel] = React.useState(defaultModel)
  const handleModelChange = React.useCallback((newModel: Model) => {
    if (newModel.value !== model.value) {
      mutate(newModel.value);
      setModel(newModel);
    }
  }, [model, mutate]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-muted w-[120px]" variant={"outline"}>
          {model.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-[250px]">
        <DropdownMenuLabel>Models</DropdownMenuLabel>
        {models.map(newModel =>
          <DropdownMenuItem
            key={newModel.value}
            className={newModel.value === model.value ? "my-1 bg-foreground/30" : ""}
            onClick={() => handleModelChange(newModel)}>
            {newModel.label}
          </DropdownMenuItem>)
        }
        <DropdownMenuItem disabled>DeepSeek R1</DropdownMenuItem>
        <DropdownMenuItem disabled>Claude 3.5 Sonnet</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ModelComboBox.displayName = "ModelComboBox"