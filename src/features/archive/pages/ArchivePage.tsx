import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { postService } from '@/features/admin/services/post.service'
import type { Post } from '@/types'

export default function ArchivePage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    postService.getAllPosts().then(setPosts).catch(() => {})
  }, [])

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="min-h-screen bg-alabaster text-charcoal">
      <header className="sticky top-0 z-50 glass-nav px-6 md:px-12 py-6 flex items-center gap-6">
        <button
          onClick={() => navigate('/')}
          className="group inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1.5" />
          Volver
        </button>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold leading-tight">
            Archivo
          </span>
          <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-charcoal leading-tight">
            Todas las Publicaciones
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider ml-auto">
          {sorted.length} {sorted.length === 1 ? 'entrada' : 'entradas'}
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="space-y-4">
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-light">No hay publicaciones aún</p>
            </div>
          ) : (
            sorted.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/post/${post.id}`, { state: { post } })}
                className="group flex items-center gap-6 p-5 md:p-6 bg-white rounded-2xl border border-black/5 hover:border-gold/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-eggshell">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold">
                      {post.postType === 'evento' ? 'Evento' : 'Crónica'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-eggshell" />
                    <span className="text-[9px] text-gray-400 font-medium">
                      {new Date(post.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-serif group-hover:text-gold transition-colors truncate">
                    {post.title}
                  </h3>
                </div>
                <div className="shrink-0 text-charcoal/20 group-hover:text-gold/40 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
