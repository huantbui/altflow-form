import {
  createFileRoute,
  getRouteApi,
  useNavigate
} from '@tanstack/react-router'
import { z } from 'zod'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SignIn, useAuth } from '@clerk/clerk-react'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().catch('/')
  }),
  component: LoginComponent
})

const routeApi = getRouteApi('/login')

function LoginComponent() {
  const navigate = useNavigate({ from: '/login' })
  const { isSignedIn } = useAuth()
  const search = routeApi.useSearch()

  if (isSignedIn) {
    navigate({ to: search.redirect })
  }

  return (
    <div className="h-screen px-3">
      <Card className={cn('w-full')}>
        <CardHeader>
          <CardTitle>Formz</CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl={search.redirect}
          // redirectUrl={`http://localhost:5173${search.redirect}`}
        />
      </Card>
    </div>
  )
}
