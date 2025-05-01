"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type ViewOption = {
  label: string
  value: string
}

interface ViewOptionsDropdownProps {
  options: ViewOption[]
  defaultValue?: string
  onViewChange: (view: string) => void
}

export function ViewOptionsDropdown({ options, defaultValue, onViewChange }: ViewOptionsDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selectedView, setSelectedView] = useState<string>(defaultValue || options[0].value)

  const handleSelect = (currentValue: string) => {
    setSelectedView(currentValue)
    onViewChange(currentValue)
    setOpen(false)
  }

  const selectedLabel = options.find((option) => option.value === selectedView)?.label || "View"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="h-9 justify-between gap-1 w-[150px]">
          <div className="flex items-center gap-1 truncate">
            <SlidersHorizontal className="h-4 w-4" />
            {selectedLabel}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="Search view..." />
          <CommandList>
            <CommandEmpty>No view found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                  <Check className={cn("mr-2 h-4 w-4", selectedView === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

