import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { useAuthStore } from '@/store'
import { Hero } from '../components/Hero'
import { Mission } from '../components/Mission'
import { Feed } from '../components/Feed'
import { Eventos } from '../components/Eventos'
import { Contacto } from '../components/Contacto'
import { Footer } from '../components/Footer'
import { postService } from '@/features/admin/services/post.service'
import type { Post } from '@/types'

export default function LandingPage() {
  const navigate = useNavigate()
  const { openLogin } = useAuthStore()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    postService.getAllPosts().then(setPosts).catch(() => {})
  }, [])

  function handlePostClick(post: Post) {
    navigate(`/post/${post.id}`, { state: { post } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const eventos = posts.filter(
    (p) => p.postType === 'evento' && (!p.date || new Date(p.date) >= todayStart)
  )
  const crónicas = [...posts.filter((p) => p.postType === 'post')].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <main className="min-h-screen bg-alabaster text-charcoal font-sans overflow-x-clip selection:bg-gold selection:text-white">
      <Navbar onLoginClick={openLogin} />
      <Hero />
      <div className="section-divider" />
      <Mission />
      <div className="section-divider" />
      <Feed posts={crónicas} onPostClick={handlePostClick} />
      <div className="section-divider" />
      <Eventos eventos={eventos} onEventoClick={handlePostClick} />
      <div className="section-divider" />
      <Contacto />
      <div className="section-divider" />
      <Footer />
    </main>
  )
}
