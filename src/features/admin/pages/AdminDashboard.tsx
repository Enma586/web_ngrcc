import { useEffect, useState } from 'react'
import { CreatePost } from '../components/CreatePost'
import { PostList } from '../components/PostList'
import { EditPost } from '../components/EditPost'
import { postService } from '../services/post.service'
import type { Post } from '@/types'
import { toast } from 'sonner'

interface Props {
  onClose: () => void
}

export default function AdminDashboard({ onClose }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadKey, setLoadKey] = useState(0)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await postService.getAllPosts()
        setPosts(data)
      } catch {
        // silent
      }
    }
    load()
  }, [loadKey])

  async function handleDelete(id: string) {
    try {
      await postService.deletePost(id)
      toast.success('Publicación eliminada con éxito')
      setLoadKey((k) => k + 1)
    } catch {
      toast.error('Error al eliminar la publicación')
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-alabaster overflow-y-auto">
        <div className="min-h-screen flex flex-col lg:flex-row w-full admin-bg-pattern">
          <aside className="w-full lg:w-[38%] bg-eggshell/20 border-r border-eggshell p-6 md:p-10 flex flex-col overflow-y-auto relative">
            <div className="absolute inset-0 bg-gradient-radial from-gold to-transparent opacity-[0.08] pointer-events-none" />

            <button
              onClick={onClose}
              className="relative z-10 self-start mb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Volver al inicio
            </button>

            <div className="brand-animate mb-8 md:mb-12 border-b border-eggshell pb-8 md:pb-10 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-charcoal rounded-2xl flex items-center justify-center text-gold shadow-xl -rotate-[4deg] hover:rotate-0 transition-transform duration-500 cursor-help">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[9px] text-gold-muted font-extrabold text-white bg-charcoal px-2 py-0.5 rounded tracking-[0.3em] uppercase leading-none mb-2 w-fit">ADMIN CORE</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Servicio En Línea</span>
                  </div>
                </div>
              </div>
              <h1 className="font-serif text-2xl md:text-[40px] font-bold text-charcoal leading-[0.95] mb-4">
                GRUPO JUVENIL<br />
                <span className="text-gold">NUEVA GENERACIÓN</span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium italic">
                <div className="w-8 h-px bg-eggshell" />
                <span>&ldquo;Luz y Camino para la Juventud&rdquo;</span>
              </div>
            </div>

            <CreatePost onCreated={() => setLoadKey((k) => k + 1)} />
          </aside>

          <PostList
            posts={posts}
            onEdit={setEditingPost}
            onDelete={handleDelete}
            onRefresh={() => setLoadKey((k) => k + 1)}
          />
        </div>
      </div>

      {editingPost && (
        <EditPost
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onUpdated={() => setLoadKey((k) => k + 1)}
        />
      )}
    </>
  )
}
