import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Modal } from '@/components/ui/Modal'
import { LoginModal } from '@/features/auth/components/LoginModal'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/store'
import LandingPage from '@/features/landing/pages/LandingPage'
import AdminDashboard from '@/features/admin/pages/AdminDashboard'
import PostDetailView from '@/features/postDetail/pages/PostDetailView'
import type { Post } from '@/types'

export default function App() {
  useAuth()
  const { showLogin, openLogin, closeLogin, openAdmin, showAdmin, closeAdmin } = useAuthStore()
  const [activePost, setActivePost] = useState<Post | null>(null)

  function handlePostClick(post: Post) {
    setActivePost(post)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setActivePost(null)
  }

  if (activePost) {
    return (
      <div className="bg-alabaster">
        <PostDetailView post={activePost} onBack={handleBack} onNavigate={handlePostClick} />
      </div>
    )
  }

  return (
    <div className="bg-alabaster">
      <Navbar
        onLoginClick={openLogin}
        onAdminClick={openAdmin}
      />

      {!showAdmin && <LandingPage onPostClick={handlePostClick} />}

      {showAdmin && <AdminDashboard onClose={closeAdmin} />}

      <Modal isOpen={showLogin} onClose={closeLogin} fullScreen>
        <LoginModal onClose={closeLogin} onSuccess={() => {}} />
      </Modal>
    </div>
  )
}
