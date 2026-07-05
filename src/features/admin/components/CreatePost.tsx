import { useState, useRef, type ChangeEvent } from 'react'
import { cloudinaryService } from '@/lib/cloudinary'
import { postService } from '../services/post.service'
import { ImagePlus, ArrowRight, Cloud, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function CreatePost({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [postType, setPostType] = useState<'post' | 'evento'>('post')
  const [date, setDate] = useState(todayStr())
  const [eventTime, setEventTime] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [statusText, setStatusText] = useState('Publicar Contenido')
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
    if (!title || !description || !imageFile) return

    setIsUploading(true)
    setStatusText('Subiendo imagen...')

    try {
      const imageUrl = await cloudinaryService.uploadImage(imageFile)
      setStatusText('Publicando...')

      const dateMs = date
        ? new Date(`${date}T${eventTime || '00:00'}`).getTime()
        : Date.now()

      await postService.createPost({ title, description, imageUrl, postType, date: dateMs })
      toast.success('Publicación creada con éxito')
      setStatusText('¡Éxito!')
      setTimeout(() => {
        setTitle('')
        setDescription('')
        setPostType('post')
        setDate(todayStr())
        setEventTime('')
        setImageFile(null)
        setImagePreview(null)
        setStatusText('Publicar Contenido')
        onCreated()
      }, 1500)
    } catch {
      setStatusText('Error al publicar')
      toast.error('Error al crear la publicación')
      setTimeout(() => setStatusText('Publicar Contenido'), 2000)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="form-animate">
      <h2 className="font-serif text-2xl font-semibold mb-6 text-charcoal flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Crear Publicación
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tipo de Contenido</label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setPostType('post')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest border-2 transition-all duration-300 cursor-pointer ${postType === 'post' ? 'border-gold bg-gold/10 text-charcoal' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Post
            </button>
            <button type="button" onClick={() => setPostType('evento')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest border-2 transition-all duration-300 cursor-pointer ${postType === 'evento' ? 'border-gold bg-gold/10 text-charcoal' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              Evento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {postType === 'evento' ? 'Fecha del Evento' : 'Fecha'}
            </label>
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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Escriba un título evocador..." className="w-full bg-white rounded-lg border border-transparent border-b-gray-200 px-4 focus:px-5 focus:border-gold focus:bg-gray-50/30 outline-hidden py-3 font-serif text-xl transition-all duration-300 placeholder:text-gray-400" required />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Imagen de Portada</label>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/webp,image/png" onChange={handleFileSelect} className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-eggshell bg-white rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gray-50/50 group relative overflow-hidden transition-all duration-300">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
            ) : (
              <div className="flex flex-col items-center text-center px-6 z-10">
                <ImagePlus className="text-4xl text-gray-300 group-hover:text-gold group-hover:-translate-y-1 transition-all duration-300 mb-3" />
                <span className="text-sm font-medium text-gray-600 mb-1">Cargar Archivo</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Formatos: JPG, WEBP, PNG (5MB)</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contenido Editorial</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Comience a escribir la historia..." className="w-full bg-white rounded-xl border border-gray-200 focus:border-gold focus:bg-gray-50/30 outline-hidden p-5 text-gray-700 leading-relaxed transition-all duration-300 resize-none placeholder:text-gray-400" required />
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isUploading || !title || !description || !imageFile} className="w-full bg-charcoal text-alabaster py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs hover:bg-black hover:shadow-2xl cursor-pointer flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : statusText === '¡Éxito!' ? <Check className="w-4 h-4 text-green-400" /> : null}
            <span>{statusText}</span>
            {!isUploading && statusText === 'Publicar Contenido' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
          </button>
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <Cloud className="w-3 h-3 text-gold" />
            Guardado automático activado
          </div>
        </div>
      </form>
    </div>
  )
}
