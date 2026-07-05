import { useState } from 'react'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import type { Post } from '@/types'

interface Props {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
}

export function PostRow({ post, onEdit, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <div className="group flex items-center justify-between p-5 md:p-7 rounded-3xl border border-transparent hover:bg-white hover:shadow-2xl hover:shadow-[#3B3C36]/8 hover:border-[#F0EAD6] cursor-pointer post-row-transition">
        <div className="flex items-center gap-4 md:gap-7 min-w-0">
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
            {post.imageUrl ? (
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${post.postType === 'evento' ? 'bg-blue-100 text-blue-700' : 'bg-[#D4AF37]/10 text-[#B8860B]'}`}>
                {post.postType === 'evento' ? 'Evento' : 'Post'}
              </span>
            </div>
            <h3 className="font-serif text-lg md:text-2xl font-semibold text-[#3B3C36] leading-tight mb-1 md:mb-2 truncate">{post.title}</h3>
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                <span className="text-[11px] font-bold uppercase tracking-tight">
                  {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              {post.date && (
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="reveal-actions opacity-0 translate-x-4 flex gap-2 md:gap-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0">
          <button onClick={() => onEdit(post)} className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-[#FAFAF7] text-gray-500 hover:text-[#D4AF37] hover:bg-white border border-[#F0EAD6] hover:border-[#D4AF37]/30 transition-all shadow-sm cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </button>
          <button onClick={() => setShowConfirm(true)} className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-[#FAFAF7] text-gray-500 hover:text-red-500 hover:bg-red-50 border border-[#F0EAD6] hover:border-red-100 transition-all shadow-sm cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Eliminar publicación"
        message={`¿Estás seguro de eliminar "${post.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={() => { setShowConfirm(false); onDelete(post.id!) }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
