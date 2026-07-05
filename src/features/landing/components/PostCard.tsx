import type { Post } from '@/types'

interface Props {
  post: Post
  onClick: () => void
}

export function PostCard({ post, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className="post-card post-card-hover-effect group p-4 md:p-6 bg-white shadow-xs reveal-up cursor-pointer"
    >
      <div className="flex gap-4 md:gap-8 items-center">
        <div className="card-zoom relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden bg-eggshell">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1 md:space-y-2 min-w-0">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
            {new Date(post.createdAt).toLocaleDateString('es-ES', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
          <h3 className="text-lg md:text-2xl font-serif leading-tight group-hover:text-gold transition-colors duration-300 italic truncate">
            {post.title}
          </h3>
          <p className="text-gray-500 font-light text-xs md:text-sm line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>
    </article>
  )
}
