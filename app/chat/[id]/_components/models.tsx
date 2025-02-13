"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GetUserPreferences } from "@/lib/client/types"

const models = [
  {
    value: "gpt-4o-mini",
    label: "GPT-4o-mini",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
  },
  {
    value: "gpt-o1-mini",
    label: "GPT-o1-mini",
  },
]


export function SwitchModels() {
  const { data: response } = useQuery<GetUserPreferences>({ queryKey: ["preferences"], queryFn: () => fetch("/api/user/preferences").then(res => res.json()) })

  if (!response?.data) {
    return <></>
  }

  return <ModelComboBox defaultModel={response?.data.defaultModel} />
}

function ModelComboBox({ defaultModel }: { defaultModel: string }) {
  const { mutate } = useMutation({
    mutationKey: ["preference"],
    mutationFn: (defaultModel: string) => fetch("/api/user/preferences", { method: "PUT", body: JSON.stringify({ defaultModel }) })
  })

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultModel)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {value
            ? models.find((framework) => framework.value === value)?.label
            : "Select a model"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {models.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    mutate(currentValue)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
