import { useUser } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  const { user } = useUser()

  return (
    <div className="p-2">
      <h3>Welcome {user?.firstName}!</h3>
    </div>
  )
}
