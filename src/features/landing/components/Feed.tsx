import { useNavigate } from 'react-router-dom'
import type { Post } from '@/types'
import { PostCard } from './PostCard'

interface Props {
  posts: Post[]
  onPostClick: (post: Post) => void
}

export function Feed({ posts, onPostClick }: Props) {
  const navigate = useNavigate()
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const mainPost = sorted[0]
  const sidePosts = sorted.slice(1, 3)

  return (
    <section id="feed" className="py-20 md:py-40 px-6 md:px-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-16 md:mb-32 reveal-up items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-8xl font-serif text-charcoal mb-6 md:mb-8">
              Crónicas de Fe
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl">
              Momentos que definen nuestro camino: retiros, encuentros y la vida diaria
              de nuestra comunidad.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right pb-2 md:pb-4">
            <button
              onClick={() => navigate('/archivo')}
              className="text-[11px] uppercase tracking-[0.4em] font-bold border-b border-gold pb-2 hover:text-gold transition-colors cursor-pointer"
            >
              Archivo Completo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {mainPost && (
            <article
              onClick={() => onPostClick(mainPost)}
              className="post-card post-card-hover-effect lg:col-span-7 group p-6 md:p-8 bg-white shadow-xs reveal-up cursor-pointer"
            >
              <div className="card-zoom relative aspect-[16/10] overflow-hidden mb-8 md:mb-10 bg-eggshell">
                <img
                  src={mainPost.imageUrl}
                  alt={mainPost.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4 md:space-y-6 max-w-2xl">
                <span className="text-gold text-[11px] font-bold uppercase tracking-[0.4em] block">
                  {new Date(mainPost.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif leading-tight group-hover:text-gold transition-colors duration-300 italic">
                  {mainPost.title}
                </h3>
                <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed line-clamp-3">
                  {mainPost.description}
                </p>
              </div>
            </article>
          )}

          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            {sidePosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
            <div className="pt-6 md:pt-8 border-t border-black/5">
              <p className="text-gray-400 font-serif italic text-lg md:text-xl">
                &ldquo;La juventud no es un tiempo de la vida, es un estado del espíritu.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
