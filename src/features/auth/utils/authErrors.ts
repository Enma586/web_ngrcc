import type { AuthError } from 'firebase/auth'

export function handleAuthError(error: AuthError): Error {
  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return new Error('El correo o la contraseña son incorrectos.')
    case 'auth/invalid-email':
      return new Error('El formato del correo electrónico no es válido.')
    case 'auth/too-many-requests':
      return new Error('Demasiados intentos fallidos. Cuenta bloqueada temporalmente.')
    default:
      return new Error('Ocurrió un error inesperado en la autenticación.')
  }
}
