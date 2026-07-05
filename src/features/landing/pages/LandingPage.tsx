import { useEffect, useState } from 'react'
import { Hero } from '../components/Hero'
import { Mission } from '../components/Mission'
import { Feed } from '../components/Feed'
import { Eventos } from '../components/Eventos'
import { Contacto } from '../components/Contacto'
import { Footer } from '../components/Footer'
import { postService } from '@/features/admin/services/post.service'
import type { Post } from '@/types'

interface Props {
  onPostClick: (post: Post) => void
}

export default function LandingPage({ onPostClick }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [now] = useState(Date.now)

  useEffect(() => {
    postService.getAllPosts().then(setPosts).catch(() => {})
  }, [])
  const eventos = posts.filter((p) => p.postType === 'evento' && (!p.date || p.date > now))
  const crónicas = posts.filter((p) => p.postType === 'post')

  return (
    <main className="min-h-screen bg-alabaster text-charcoal font-sans overflow-x-clip selection:bg-gold selection:text-white">
      <Hero />
      <div className="section-divider" />
      <Mission />
      <div className="section-divider" />
      <Feed posts={crónicas} onPostClick={onPostClick} />
      <div className="section-divider" />
      <Eventos eventos={eventos} onEventoClick={onPostClick} />
      <div className="section-divider" />
      <Contacto />
      <div className="section-divider" />
      <Footer />
    </main>
  )
}
