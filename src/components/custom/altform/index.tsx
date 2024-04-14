import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { UseFormReturn, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { AltField, AltFieldsMap, AltFormProps } from './altform'
import { FieldLayout } from './layout'
import { isParentFieldAnswered, prepareFormData } from './states'

export const AltForm = (props: AltFormProps) => {
  const { onSubmit, altfields, resolver } = props

  const altfieldsMap: AltFieldsMap = altfields.reduce(
    (acc: any, curr: AltField, index: number) => {
      acc[curr?.name] = curr.defaultValue || ''
      return {
        initialValues: {
          ...acc.initialValues,
          [curr.name]: curr.defaultValue || ''
        },
        map: {
          ...acc.map,
          [curr.name]: {
            order: index,
            toHide: false,
            ...curr
          }
        }
      }
    },
    {
      initialValues: {},
      map: {}
    }
  )

  const form: UseFormReturn = useForm({
    resolver: resolver || undefined,
    defaultValues: altfieldsMap.initialValues
  })

  const { getFieldState, formState } = form

  async function handleOnSubmit(data: any) {
    const finalData = prepareFormData(
      data,
      altfieldsMap,
      formState,
      getFieldState
    )
    try {
      await onSubmit(finalData)
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(finalData, null, 2)}
            </code>
          </pre>
        )
      })
    } catch (error: any) {
      console.log('error', error)
      toast({
        variant: 'destructive',
        title: 'Error submitting:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{`${error}`}</code>
          </pre>
        )
      })
    }
  }

  // console.log('getValues', getValues())
  // console.log('formState', formState)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="w-full space-y-6"
      >
        {altfields.map((altfield) => {
          const key =
            altfield.name?.toLowerCase()?.replaceAll(' ', '-') || uuid()

          /**
           * if current field has parent, then based on parent's state,
           * determine if current field hide/show
           */
          if (altfield?.parentFieldId) {
            const shouldShowField = isParentFieldAnswered(
              altfield?.parentFieldId,
              formState
            )
            if (!shouldShowField) return null
          }
          return (
            <FormField
              key={key}
              control={form.control}
              name={altfield.name}
              render={({ field }) => (
                <FieldLayout altfield={altfield} field={field} />
              )}
            />
          )
        })}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
