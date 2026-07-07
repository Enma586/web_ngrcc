import { useState, useRef, type ChangeEvent } from 'react'
import { cloudinaryService } from '@/lib/cloudinary'
import { postService } from '../services/post.service'
import { ArrowRight, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import type { Post } from '@/types'

interface Props {
  post: Post
  onClose: () => void
  onUpdated: () => void
}

function toDateInputValue(ms: number | undefined) {
  if (!ms) return new Date().toISOString().slice(0, 10)
  return new Date(ms).toISOString().slice(0, 10)
}

function toTimeInputValue(ms: number | undefined) {
  if (!ms) return ''
  return new Date(ms).toTimeString().slice(0, 5)
}

export function EditPost({ post, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [postType, setPostType] = useState(post.postType)
  const [date, setDate] = useState(toDateInputValue(post.date))
  const [eventTime, setEventTime] = useState(toTimeInputValue(post.date))
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(post.imageUrl)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!post.id || !title || !description) return

    setIsUploading(true)
    try {
      let imageUrl = post.imageUrl
      if (imageFile) {
        imageUrl = await cloudinaryService.uploadImage(imageFile)
      }
      const dateMs = date
        ? new Date(`${date}T${eventTime || '00:00'}`).getTime()
        : Date.now()

      const updateData: { title: string; description: string; imageUrl: string; postType: 'post' | 'evento'; date?: number } = { title, description, imageUrl, postType }
      updateData.date = dateMs
      await postService.updatePost(post.id, updateData)
      toast.success('Publicación actualizada con éxito')
      onUpdated()
      onClose()
    } catch {
      toast.error('Error al actualizar la publicación')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-alabaster rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 md:p-10 animate-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">Editar Publicación</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-charcoal transition-colors cursor-pointer"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tipo</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setPostType('post')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest border-2 transition-all duration-300 cursor-pointer ${postType === 'post' ? 'border-gold bg-gold/10 text-charcoal' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}>Post</button>
              <button type="button" onClick={() => setPostType('evento')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest border-2 transition-all duration-300 cursor-pointer ${postType === 'evento' ? 'border-gold bg-gold/10 text-charcoal' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}>Evento</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{postType === 'evento' ? 'Fecha del Evento' : 'Fecha'}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input w-full bg-white rounded-lg border border-gray-200 px-4 py-3 outline-hidden focus:border-gold focus:bg-gray-50/30 text-sm transition-all duration-300" />
            </div>
            {postType === 'evento' && (
              <div className="group">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Hora</label>
                <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="form-input w-full bg-white rounded-lg border border-gray-200 px-4 py-3 outline-hidden focus:border-gold focus:bg-gray-50/30 text-sm transition-all duration-300" />
              </div>
            )}
            {postType === 'post' && <div />}
          </div>

          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white rounded-lg border border-transparent border-b-gray-200 px-4 focus:px-5 focus:border-gold focus:bg-gray-50/30 outline-hidden py-3 font-serif text-xl transition-all duration-300" required />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Imagen</label>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/webp,image/png" onChange={handleFileSelect} className="hidden" />
            <div onClick={() => fileInputRef.current?.click()} className="relative bg-white rounded-2xl h-36 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gold/20 hover:border-gold hover:bg-gradient-to-b hover:from-gold/5 hover:to-transparent group overflow-hidden transition-all duration-300">
              {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover absolute inset-0" /> : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 group-hover:text-gold transition-all duration-300"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contenido Editorial</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full bg-white rounded-xl border border-gray-200 focus:border-gold focus:bg-gray-50/30 outline-hidden p-5 text-gray-700 leading-relaxed transition-all duration-300 resize-none" required />
          </div>

          <button type="submit" disabled={isUploading} className="w-full text-black py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50" style={{ background: 'linear-gradient(to right, #FF7500, #FFC800)' }}>
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{isUploading ? 'Guardando...' : 'Guardar Cambios'}</span>
            {!isUploading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  )
}
