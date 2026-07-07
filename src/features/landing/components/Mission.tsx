export function Mission() {
  return (
    <section id="mision" className="py-20 md:py-32 px-6 md:px-24 border-t border-black/5 bg-white/40 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">
            Nuestra Identidad
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-charcoal mt-6 mb-6 italic leading-tight">
            Pilares de <span className="not-italic font-bold">Nueva Generación</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Tres principios fundamentales que guían nuestro camino como comunidad juvenil.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="feature-item p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/5 space-y-4 md:space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">01</span>
            <h3 className="font-serif text-2xl md:text-3xl italic">Comunidad Viva</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-light">
              Fomentamos un ambiente de hermandad donde cada joven se siente valorado
              y parte de una familia espiritual.
            </p>
          </div>
          <div className="feature-item p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/5 space-y-4 md:space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">02</span>
            <h3 className="font-serif text-2xl md:text-3xl italic">Dones al Servicio</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-light">
              Ponemos nuestros dones al servicio de los demás, entendiendo que el amor
              se manifiesta en la acción.
            </p>
          </div>
          <div className="feature-item p-8 md:p-12 space-y-4 md:space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">03</span>
            <h3 className="font-serif text-2xl md:text-3xl italic">Renovados en la Fé </h3>
            <p className="text-gray-500 leading-relaxed text-sm font-light">
              Abrazamos nuevamente la esencia de nuestro camino espiritual para iluminar el mundo de hoy, con paz y firmeza.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
