import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import { Navbar } from './components/custom/navbar'
import { Toaster } from './components/ui/toaster'
import { AltForm } from './components/custom/altform'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from './components/ui/card'
import { cn } from './lib/utils'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmitUser(data: any) {
    console.log('data', data)
  }

  return (
    <ThemeProvider defaultTheme="system">
      <div className="relative flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <Navbar />
            <ModeToggle />
          </div>
        </header>
        {/* <main className="flex-1">{children}</main> */}
        <div className="h-screen px-3">
          <Card className={cn('w-full')}>
            <CardHeader>
              <CardTitle>Check-Inz</CardTitle>
              <CardDescription>Sign up to volunteer.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <AltForm
                onSubmit={onSubmitUser}
                name="user"
                // resolver={zodResolver(schema)}
                fields={[
                  {
                    name: 'name',
                    label: 'Name',
                    component: 'input',
                    attributes: {
                      type: 'text'
                    }
                  },
                  {
                    name: 'email',
                    label: 'Email',
                    component: 'input',
                    attributes: {
                      type: 'email'
                    }
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
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
