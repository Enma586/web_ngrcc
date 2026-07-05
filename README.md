# Grupo Juvenil Nueva Generacion

Sistema de gestion de contenido para el grupo juvenil de la Iglesia Catolica San Antonio Maria Claret. Landing page con blog de cronicas, seccion de eventos, panel de administracion y autenticacion mediante Firebase.

## Stack tecnologico

- **Frontend**: React 19, TypeScript 6, Vite 8
- **Estilos**: Tailwind CSS v4, diseno original sin librerias de componentes
- **Iconos**: lucide-react
- **Estado global**: Zustand
- **Backend**: Firebase (Auth + Firestore)
- **Imagenes**: Cloudinary (unsigned upload)
- **Notificaciones**: sonner

## Estructura del proyecto

```
src/
├── main.tsx                          # Entry point con Toaster
├── App.tsx                           # Root con estados de vista
├── index.css                         # Tailwind v4 + diseno propio
├── lib/
│   ├── config.ts                     # Variables de entorno
│   ├── utils.ts                      # cn() helper
│   ├── firebase.ts                   # Inicializacion Firebase
│   └── cloudinary.ts                 # Upload a Cloudinary
├── types/
│   └── post.types.ts                 # Tipos Post, PostType
├── store/
│   └── authStore.ts                  # Estado de autenticacion
├── components/
│   ├── layout/Navbar.tsx             # Navbar sticky con menu movil
│   └── ui/                           # Modal, Button, Input, ConfirmModal
├── features/
│   ├── auth/                         # Login, hook useAuth, servicio, tipos
│   ├── landing/                      # Hero, Mission, Feed, Eventos, Contacto, Footer
│   ├── admin/                        # CreatePost, EditPost, PostList, PostRow, AdminDashboard
│   └── postDetail/                   # Vista de detalle con navegacion
```

## Funcionalidades

### Landing page
- Hero con titulo animado y watermark "NG"
- Seccion Mision con tres pilares (Comunidad Viva, Servicio Alegre, Fe Renovada)
- Feed de cronicas con cards desde Firestore
- Seccion de Eventos proximos con fecha y hora
- Seccion Contacto con enlaces a email, Google Maps e Instagram
- Footer con modal de informacion legal

### Autenticacion
- Acceso mediante presion prolongada en el logo (1.5 segundos)
- Login con correo y contrasena via Firebase Auth
- Sesion persistente (al recargar se mantiene autenticado)
- Boton "Salir" destruye el token de Firebase

### Panel de administracion
- Crear publicaciones (Post o Evento) con imagen via Cloudinary
- Editar y eliminar publicaciones con modal de confirmacion
- Selector de fecha (para posts se usa la fecha actual por defecto)
- Selector de fecha y hora para eventos
- Notificaciones toast en cada operacion CRUD

### Vista de detalle
- Visualizacion completa del post/evento con imagen principal
- Navegacion Anterior/Siguiente filtrada por mismo tipo
- Boton de compartir (Web Share API con fallback a clipboard)

## Despliegue

### Cloudflare Pages

1. Conectar el repositorio a Cloudflare Pages
2. Configurar:

| Campo | Valor |
|---|---|
| Framework preset | Vite |
| Build command | npm run build |
| Build output directory | dist |

3. Agregar las siguientes variables de entorno en Production:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
VITE_CONTACT_EMAIL
VITE_GMAIL_URL
VITE_MAPS_URL
VITE_INSTAGRAM_URL
```

El archivo `public/_redirects` redirige todas las rutas a `index.html` para SPA routing.

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto con las siguientes variables:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CONTACT_EMAIL=contacto@ejemplo.org
VITE_GMAIL_URL=https://mail.google.com/mail/?view=cm&fs=1&to=contacto@ejemplo.org
VITE_MAPS_URL=https://maps.google.com/?q=Direccion
VITE_INSTAGRAM_URL=https://instagram.com/
```

## Scripts

```bash
npm run dev        # Entorno de desarrollo
npm run build      # Compilacion de produccion
npm run preview    # Vista previa del build
npm run lint       # ESLint
```
