import { useUser } from '@clerk/clerk-react'
import { createContext, useContext } from 'react'

// export interface AuthContext {
interface AuthContext {
  isAuthenticated: boolean
  // setUser: (username: string | null) => void
  user: any | null
}

const AuthContext = createContext<AuthContext | null>(null)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  // const [user, setUser] = useState<string | null>(null)
  const isAuthenticated = !!user
  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * not used - use Clerk instead
 * @returns
 */
// export function useAuth() {
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
