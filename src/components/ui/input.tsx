import * as React from 'react'

import { cn, numbersOnly } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: React.ChangeEventHandler<any>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, ...props }, ref) => {
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
      if (type === 'tel' || type === 'number') {
        const finalResult: any = numbersOnly(event?.target?.value)
        onChange(finalResult)
      } else {
        onChange(event)
      }
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
        onChange={(e) => handleOnChange(e)}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
