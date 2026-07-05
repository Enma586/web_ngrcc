import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { Post } from '@/types'
import { postService } from '@/features/admin/services/post.service'

interface Props {
  post: Post
  onBack: () => void
  onNavigate?: (post: Post) => void
}

export default function PostDetailView({ post, onBack, onNavigate }: Props) {
  const [posts, setPosts] = useState<Post[]>([])

  const sameTypePosts = useMemo(() => posts.filter((p) => p.postType === post.postType), [posts, post.postType])
  const currentIndex = sameTypePosts.findIndex((p) => p.id === post.id)
  const prevPost = currentIndex > 0 ? sameTypePosts[currentIndex - 1] : null
  const nextPost = currentIndex < sameTypePosts.length - 1 ? sameTypePosts[currentIndex + 1] : null

  useEffect(() => {
    postService.getAllPosts().then(setPosts).catch(() => {})
  }, [post.id])

  async function handleShare() {
    const shareText = `${post.title}\n\n${post.description}\n\n— Grupo Juvenil Nueva Generación`
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: shareText })
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText)
        toast.success('Contenido copiado al portapapeles')
      } catch {
        toast.error('No se pudo compartir el contenido')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#3B3C36] selection:bg-[#D4AF37] selection:text-white">
      <header className="sticky top-0 z-50 px-4 md:px-12 py-4 flex items-center justify-between glass-nav">
        <button
          onClick={onBack}
          className="group inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#3B3C36]/60 hover:text-[#3B3C36] transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="text-lg mr-3 transition-transform group-hover:-translate-x-1.5" />
          <span className="hidden sm:inline">Volver al Inicio</span>
        </button>
        <div className="hidden md:flex flex-col items-center">
          <span className="font-serif italic text-lg text-[#3B3C36] leading-none">Grupo Juvenil</span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] mt-1 font-bold">Nueva Generación</span>
        </div>
        <button
          onClick={handleShare}
          className="text-[#3B3C36]/40 hover:text-[#D4AF37] transition-colors cursor-pointer p-2"
          aria-label="Compartir"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <section className="pt-8 md:pt-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="hero-container relative mb-12 md:mb-20">
          <div className="overflow-hidden rounded-xl shadow-lg aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/8]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 text-[#3B3C36]/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
            <span className="text-[#D4AF37]">
              {post.postType === 'evento' ? 'Próximos Eventos' : 'Crónicas de Fe'}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
            <span>{new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {post.date && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                <span className="text-[#D4AF37]">
                  {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-light leading-[1.1] mb-10 text-[#3B3C36]">
            {post.title}
          </h1>
        </div>
      </section>

      <main className="max-w-[42rem] mx-auto px-4 md:px-6 pb-24 md:pb-32">
        <div className="leading-[1.8] text-[#3B3C36]/85 text-base md:text-lg">
          <p className="mb-10 text-justify md:text-left">{post.description}</p>
        </div>

        <div className="border-t border-[#F0EAD6] pt-8 md:pt-12 mt-12 md:mt-20">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
            <span className="px-4 md:px-5 py-2 bg-[#F0EAD6]/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3B3C36]/70 hover:bg-[#D4AF37]/10 transition-colors cursor-pointer">Comunidad</span>
            <span className="px-4 md:px-5 py-2 bg-[#F0EAD6]/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3B3C36]/70 hover:bg-[#D4AF37]/10 transition-colors cursor-pointer">Fe</span>
            <span className="px-4 md:px-5 py-2 bg-[#F0EAD6]/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3B3C36]/70 hover:bg-[#D4AF37]/10 transition-colors cursor-pointer">Juventud</span>
          </div>

          {(prevPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {prevPost ? (
                <button
                  onClick={() => onNavigate?.(prevPost)}
                  className="group p-6 md:p-8 bg-[#F0EAD6]/20 rounded-3xl border border-[#F0EAD6] hover:border-[#D4AF37]/30 transition-colors text-left cursor-pointer"
                >
                  <p className="text-[#3B3C36]/40 text-[9px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" /> Anterior
                  </p>
                  <h4 className="font-serif text-lg md:text-2xl group-hover:text-[#D4AF37] transition-colors truncate">
                    {prevPost.title}
                  </h4>
                </button>
              ) : <div />}
              {nextPost ? (
                <button
                  onClick={() => onNavigate?.(nextPost)}
                  className="group p-6 md:p-8 bg-[#F0EAD6]/20 rounded-3xl border border-[#F0EAD6] hover:border-[#D4AF37]/30 transition-colors text-right cursor-pointer"
                >
                  <p className="text-[#3B3C36]/40 text-[9px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center justify-end gap-2">
                    Siguiente <ArrowRight className="w-3 h-3" />
                  </p>
                  <h4 className="font-serif text-lg md:text-2xl group-hover:text-[#D4AF37] transition-colors truncate">
                    {nextPost.title}
                  </h4>
                </button>
              ) : <div />}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#F0EAD6]/30 border-t border-[#F0EAD6] py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 md:mb-12">
            <div className="inline-block px-4 md:px-6 py-2 border border-[#D4AF37]/20 mb-6 md:mb-8">
              <span className="text-[8px] uppercase tracking-[0.6em] text-[#D4AF37] font-bold">Identidad Institucional</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-6xl text-[#3B3C36] mb-4 md:mb-6">Grupo Juvenil Nueva Generación</h3>
            <p className="text-[#3B3C36]/70 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Gestionando la fe con reverencia y modernidad. Formando corazones y construyendo comunidad para el siglo XXI.
            </p>
          </div>
          <div className="w-full h-px bg-[#3B3C36]/5 my-12 md:my-20" />
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6 text-[9px] uppercase tracking-[0.3em] text-[#3B3C36]/80">
            <p>&copy; 2024 Grupo Juvenil Nueva Generación. Todos los derechos reservados.</p>
            <div className="flex gap-8 md:gap-10">
              <button className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacidad</button>
              <button className="hover:text-[#D4AF37] transition-colors cursor-pointer">Términos</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
