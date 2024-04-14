import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectOption } from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { VerificationCode } from '@/components/ui/verification'
import { cn } from '@/lib/utils'
import { CalendarIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover'
import { Slider } from '@radix-ui/react-slider'
import { format } from 'date-fns'
import { ControllerRenderProps } from 'react-hook-form'
import { AltField } from './altform'

interface FieldProps {
  altfield: AltField
  field: ControllerRenderProps
}

export const Field = ({ altfield, field }: FieldProps) => {
  const { component, attributes, options, isMulti } = altfield
  const { onChange } = field

  switch (component) {
    case 'verification':
      return (
        <VerificationCode
          digits={attributes?.length || 1}
          type={attributes?.type || 'tel'}
          onChange={onChange}
        />
      )
    case 'input':
      return (
        <Input
          placeholder={altfield?.placeholder}
          className="resize-none w-full"
          {...field}
          {...attributes}
          onChange={onChange}
        />
      )
    case 'slider':
      return (
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={cn('w-[60%]')}
          {...attributes}
        />
      )
    case 'textarea':
      return (
        <Textarea
          placeholder={altfield?.placeholder}
          className="resize-none"
          {...field}
          {...attributes}
        />
      )
    case 'checkboxes': {
      const onChangeHandle = (
        checked: boolean,
        option: string[] | SelectOption[]
      ) => {
        if (!isMulti) {
          return field.onChange(
            checked
              ? [(option as unknown as SelectOption)?.value || option]
              : []
          )
        }
        return checked
          ? field.onChange([
              ...field.value,
              (option as unknown as SelectOption)?.value || option
            ])
          : field.onChange(
              field.value?.filter(
                (value) =>
                  value !==
                  ((option as unknown as SelectOption)?.value || option)
              )
            )
      }
      return options?.map((option) => {
        return (
          <div
            key={option?.value || option}
            className="flex flex-row items-start space-x-3 space-y-0"
          >
            <Checkbox
              checked={field.value?.includes(option?.value || option)}
              onCheckedChange={(checked: boolean) =>
                onChangeHandle(checked, option)
              }
            />
            <FormLabel className="text-sm font-normal">
              {option?.label || option}
            </FormLabel>
          </div>
        )
      })
    }
    case 'datepicker':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={altfield?.attributes?.mode}
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
    default: {
      const errorMessage = `Component "${component}" does not exist`
      console.error(errorMessage)
      return (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )
    }
  }
}
