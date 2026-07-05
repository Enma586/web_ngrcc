import { create } from 'zustand'
import type { User } from 'firebase/auth'
import { authService } from '@/features/auth/services/auth.service'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  showLogin: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  openLogin: () => void
  closeLogin: () => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  showLogin: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  openLogin: () => set({ showLogin: true }),
  closeLogin: () => set({ showLogin: false }),
  logout: async () => {
    await authService.logout()
    set({ user: null, isAuthenticated: false })
  },
}))
