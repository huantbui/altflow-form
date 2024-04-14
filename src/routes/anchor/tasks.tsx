import { AltForm } from '@/components/custom/altform'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anchor/tasks')({
  component: Tasks
})

function Tasks() {
  async function onSubmitUser(data: any) {
    console.log('data', data)
    throw new Error('failed to save down to server')
  }

  return (
    <div className="h-screen px-3">
      <Card className={cn('w-full')}>
        <CardHeader>
          <CardTitle>Anchor Church</CardTitle>
          <CardDescription>Tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AltForm
            onSubmit={onSubmitUser}
            name="tasklist"
            // resolver={resolver}
            altfields={[
              {
                name: 'first_name',
                label: 'Open Door',
                description: 'Be sure all doors are unlocked',
                component: 'checkbox'
              },
              {
                name: 'last_name',
                label: 'Last Name',
                component: 'input',
                parentFieldId: 'first_name'
              },
              {
                name: 'check_all',
                label: 'Open Door',
                description: 'Be sure all doors are unlocked',
                component: 'checkboxes',
                options: [
                  {
                    label: 'Recents',
                    value: 'recent'
                  },
                  {
                    label: 'Home',
                    value: 'home'
                  },
                  {
                    label: 'Applications',
                    value: 'applications'
                  }
                ]
              },
              {
                name: 'selections',
                label: 'Select options',
                description:
                  'Select the items you want to display in the sidebar.',
                component: 'select',
                // defaultValue: ['home'],
                isMulti: true,
                options: [
                  {
                    label: 'Recents',
                    value: 'recent'
                  },
                  {
                    label: 'Home',
                    value: 'home'
                  },
                  {
                    label: 'Applications',
                    value: 'applications'
                  }
                ]
              }
            ]}
          />
        </CardContent>
        {/* <CardFooter>
            <Button className="w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </CardFooter> */}
      </Card>
    </div>
  )
}
