import { useUser } from '@clerk/clerk-react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: DashboardComponent
})

function DashboardComponent() {
  const { user } = useUser()

  console.log('user', user)

  return (
    <div className="p-2">
      <h3>Dashboard page</h3>
      <p>Hi {user?.firstName}!</p>
      <p>If you can see this, that means you are authenticated.</p>
    </div>
  )
}
