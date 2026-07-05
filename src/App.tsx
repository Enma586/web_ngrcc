import { Routes, Route } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { LoginModal } from '@/features/auth/components/LoginModal'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/store'
import LandingPage from '@/features/landing/pages/LandingPage'
import AdminDashboard from '@/features/admin/pages/AdminDashboard'
import PostDetailView from '@/features/postDetail/pages/PostDetailView'

export default function App() {
  useAuth()
  const { showLogin, closeLogin } = useAuthStore()

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:id" element={<PostDetailView />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Modal isOpen={showLogin} onClose={closeLogin} fullScreen>
        <LoginModal onClose={closeLogin} onSuccess={() => {}} />
      </Modal>
    </>
  )
}
