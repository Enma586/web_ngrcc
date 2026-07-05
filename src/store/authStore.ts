import { create } from 'zustand'
import type { User } from 'firebase/auth'
import { authService } from '@/features/auth/services/auth.service'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  showLogin: boolean
  showAdmin: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  openLogin: () => void
  closeLogin: () => void
  openAdmin: () => void
  closeAdmin: () => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  showLogin: false,
  showAdmin: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  openLogin: () => set({ showLogin: true }),
  closeLogin: () => set({ showLogin: false }),
  openAdmin: () => set({ showAdmin: true }),
  closeAdmin: () => set({ showAdmin: false }),
  logout: async () => {
    await authService.logout()
    set({ user: null, isAuthenticated: false, showAdmin: false })
  },
}))
