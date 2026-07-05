import { useEffect } from 'react'
import { authService } from '../services/auth.service'
import { useAuthStore } from '@/store'

export function useAuth() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [setUser, setLoading])
}
