import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type AuthError,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { LoginCredentials } from '../types/auth.types'
import { handleAuthError } from '../utils/authErrors'

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw handleAuthError(error as AuthError)
    }
  },

  async logout(): Promise<void> {
    await signOut(auth)
  },

  subscribeToAuthChanges(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback)
  },
}
