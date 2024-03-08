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
  | (string & {})

type AltFieldComponent =
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
  defaultValue?: string
  component: AltFieldComponent
  required?: boolean
  label?: string
  description?: string
  attributes?: {
    type?: HTMLAttributesType
    [key: string]: any
  }
}

interface AltFormProps {
  name?: string
  fields: AltField[]
  resolver?: any
  onSubmit: any
}
