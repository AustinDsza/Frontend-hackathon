"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ProductInventoryDropdownProps {
  categories: string[]
  onFilterChange: (category: string | null) => void
}

export function ProductInventoryDropdown({ categories, onFilterChange }: ProductInventoryDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelect = (currentValue: string) => {
    // If clicking the already selected category, clear the filter
    const newValue = currentValue === selectedCategory ? null : currentValue
    setSelectedCategory(newValue)
    onFilterChange(newValue)
    setOpen(false)
  }

  const clearFilter = () => {
    setSelectedCategory(null)
    onFilterChange(null)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="h-9 justify-between gap-1 w-[200px]">
          <div className="flex items-center gap-1 truncate">
            <Filter className="h-4 w-4" />
            {selectedCategory ? selectedCategory : "Filter by Category"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem key={category} value={category} onSelect={() => handleSelect(category)}>
                  <Check className={cn("mr-2 h-4 w-4", selectedCategory === category ? "opacity-100" : "opacity-0")} />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedCategory && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={clearFilter} className="justify-center text-sm text-muted-foreground">
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

