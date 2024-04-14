import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type SelectOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface MultiSelectFormFieldProps {
  options: SelectOption[]
  defaultValue?: string[]
  onValueChange: (value: string[]) => void
  disabled?: boolean
  placeholder: string
  className?: string
  animationSpeed?: number
}

const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFormFieldProps
>(
  (
    {
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      className,
      animationSpeed = 2,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState(
      new Set(defaultValue || [])
    )
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
      setSelectedValues(new Set(defaultValue))
    }, [defaultValue])

    const handleInputKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true)
      } else if (event.key === 'Backspace' && !event.target.value) {
        const values = Array.from(selectedValues)
        values.pop()
        setSelectedValues(new Set(values))
        onValueChange(values)
      }
    }

    const toggleOption = useCallback(
      (value: string) => {
        const newSelectedValues = new Set(selectedValues)
        if (newSelectedValues.has(value)) {
          newSelectedValues.delete(value)
        } else {
          newSelectedValues.add(value)
        }
        setSelectedValues(newSelectedValues)
        onValueChange(Array.from(newSelectedValues))
      },
      [selectedValues, onValueChange]
    )

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="drop-shadow-xl flex w-full rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-card"
          >
            {Array.from(selectedValues).length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {Array.from(selectedValues).map((value) => {
                    const option = options.find((o) => o.value === value)
                    const IconComponent = option?.icon
                    return (
                      <Badge
                        key={value}
                        variant="outline"
                        className={cn(
                          'drop-shadow-md m-1 bg-card transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
                        )}
                        style={{
                          animationDuration: `${animationSpeed}s`
                        }}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {option?.label}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            toggleOption(value)
                            event.stopPropagation()
                          }}
                        />
                      </Badge>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      setSelectedValues(new Set([]))
                      onValueChange(Array.from(new Set([])))
                      event.stopPropagation()
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[200px] p-0 drop-shadow-xl"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onInteractOutside={(event) => {
            if (!event.defaultPrevented) {
              setIsPopoverOpen(false)
            }
          }}
        >
          <Command>
            <CommandInput
              placeholder={placeholder}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        toggleOption(option.value)
                      }}
                      style={{
                        pointerEvents: 'auto',
                        opacity: 1
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedValues(new Set([]))
                        onValueChange(Array.from(new Set([])))
                      }}
                      style={{
                        pointerEvents: 'auto',
                        opacity: 1
                      }}
                      className="justify-center text-center"
                    >
                      Clear filters
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
)

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect
