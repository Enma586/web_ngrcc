import type { Post } from '@/types'
import { PostRow } from './PostRow'

interface Props {
  posts: Post[]
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
  onRefresh: () => void
}

export function PostList({ posts, onEdit, onDelete, onRefresh }: Props) {
  return (
    <section className="w-full lg:w-[62%] bg-alabaster p-6 md:p-10 flex flex-col overflow-y-auto">
      <div className="header-animate flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-eggshell pb-6 md:pb-8 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="px-3 py-1 bg-gold/10 text-gold-muted text-[11px] font-bold uppercase tracking-[0.2em] rounded-full border border-gold/20">
              Panel Institucional
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              Nueva Generación
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal tracking-tight">
            Gestión de Contenidos
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Consola Administrativa de{' '}
            <span className="text-charcoal font-bold">Grupo Juvenil Nueva Generación</span>
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="text-[11px] uppercase tracking-[0.3em] font-bold text-gold hover:text-charcoal transition-colors cursor-pointer shrink-0"
        >
          ↻ Actualizar
        </button>
      </div>

      <div className="list-container space-y-2 md:space-y-3">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-serif text-2xl italic">No hay publicaciones aún</p>
            <p className="text-[11px] uppercase tracking-[0.3em] mt-4 font-bold">
              Crea la primera publicación desde el panel izquierdo
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className="footer-animate mt-auto pt-8 md:pt-10 border-t border-eggshell flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">
            Total Publicaciones
          </span>
          <span className="text-lg md:text-xl font-serif font-bold text-charcoal">
            {posts.length}
          </span>
        </div>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">
          &copy; 2024 GRUPO JUVENIL NUEVA GENERACI&Oacute;N &bull; ADMIN PANEL
        </p>
      </div>
    </section>
  )
}
