import { SelectOption } from '@/components/ui/multi-select'
import { Resolver } from 'react-hook-form'

type HTMLAttributesType =
  | React.InputHTMLAttributes<unknown>['type']
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

type AltFieldComponent =
  | 'checkbox'
  | 'checkboxes'
  | 'datepicker'
  | 'input'
  | 'select'
  | 'slider'
  | 'switch'
  | 'textarea'
  | 'verification'

export interface AltField {
  name: string
  placeholder?: string
  defaultValue?: string | string[]
  component: AltFieldComponent
  required?: boolean
  label?: string
  description?: string
  options?: string[] | SelectOption[]
  isMulti?: boolean
  attributes?: {
    type?: HTMLAttributesType
    length?: number
    [key: string]: any
  }
  parentFieldId?: string
}

export type AltFieldsMap = {
  initialValues: any
  map: Record<
    AltField['name'],
    AltField & {
      order: string
    }
  >
}

export interface AltFormProps {
  name?: string
  altfields: AltField[]
  resolver?: Resolver
  onSubmit: any
}
