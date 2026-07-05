export const config = {
  appName: 'Grupo Juvenil Nueva Generación',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  },
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL,
    gmailUrl: import.meta.env.VITE_GMAIL_URL,
    mapsUrl: import.meta.env.VITE_MAPS_URL,
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL,
  },
} as const
