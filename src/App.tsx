import { Toaster } from './components/ui/toaster'

import { RouterProvider, createRouter } from '@tanstack/react-router'

import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { routeTree } from './routeTree.gen'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined! // This will be set after we wrap the app in an AuthProvider
  }
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          baseTheme: undefined
        }}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          {/* <main className="flex-1">{children}</main> */}
          <InnerApp />
        </div>
      </ClerkProvider>
      <Toaster />
    </>
  )
}

export default App
