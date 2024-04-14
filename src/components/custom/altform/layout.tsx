import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { AltField } from './altform'
import { Field } from './field'
import { Checkbox } from '@/components/ui/checkbox'
import MultiSelect, { SelectOption } from '@/components/ui/multi-select'

interface Props {
  altfield: AltField
  field: ControllerRenderProps
}
export const FieldLayout = ({ altfield, field }: Props) => {
  switch (altfield.component) {
    case 'checkbox':
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {altfield.label ? (
              <FormLabel className="cursor-pointer">{altfield.label}</FormLabel>
            ) : null}
            {altfield.description ? (
              <FormDescription>{altfield.description}</FormDescription>
            ) : null}
          </div>
          <FormMessage />
        </FormItem>
      )
    /**
     * checkboxes will always be an array of values even if it is not a multi-selection.
     * This is to cater the change when switching value of `isMulti`.
     */
    case 'checkboxes':
      return (
        <FormItem className="rounded-md border p-4">
          <div className="space-y-1 leading-none">
            {altfield.label ? <FormLabel>{altfield.label}</FormLabel> : null}
            {altfield.description ? (
              <FormDescription>{altfield.description}</FormDescription>
            ) : null}
          </div>
          <FormMessage />
          <FormControl className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
            <Field altfield={altfield} field={field} />
          </FormControl>
        </FormItem>
      )
    /**
     * select will always be an array of values even if it is not a multi-selection.
     * This is to cater the change when switching value of `isMulti`.
     */
    case 'select': {
      if (!altfield?.options) throw Error('No options for Select component')
      const onChangeHandle = (selection) => {
        field.onChange([selection])
      }
      return (
        <FormItem>
          {altfield.label ? <FormLabel>{altfield.label}</FormLabel> : null}
          {/* Select cannot be put into `<Field />` for some reason.  The styling will be off  */}
          {altfield?.isMulti ? (
            <FormControl>
              <MultiSelect
                options={altfield.options as SelectOption[]}
                defaultValue={field.value}
                onValueChange={field.onChange}
                placeholder="Select options"
              />
            </FormControl>
          ) : (
            <Select
              onValueChange={(props) => onChangeHandle(props)}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={altfield?.placeholder ?? 'Select'}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {altfield?.options?.map((option, idx) => {
                  return (
                    <SelectItem key={idx} {...field} value={option}>
                      {option}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )}
          {altfield.description ? (
            <FormDescription>{altfield.description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )
    }

    default:
      return (
        <FormItem>
          {altfield.label ? <FormLabel>{altfield.label}</FormLabel> : null}
          <FormControl>
            <Field altfield={altfield} field={field} />
          </FormControl>
          {altfield.description ? (
            <FormDescription>{altfield.description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )
  }
}
