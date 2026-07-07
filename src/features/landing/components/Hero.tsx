export function Hero() {
  return (
    <header className="relative min-h-dvh flex flex-col justify-end px-6 md:px-24 pb-12 md:pb-24 overflow-hidden">
      <div className="hero-bg-text" aria-hidden="true">NG</div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10 items-end">
        <div className="md:col-span-7 lg:col-span-9">
          <div className="pb-6 md:pb-12">
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif leading-[0.85] text-charcoal">
              <span className="block overflow-hidden">
                <span className="block title-line text-base md:text-lg lg:text-4xl uppercase tracking-[0.5em] lg:tracking-[0.6em] mb-4 md:mb-6 lg:mb-12 font-sans font-bold text-gold">
                  Grupo Juvenil
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block title-line">Nueva</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block title-line italic font-light opacity-80 md:pl-0 lg:pl-24">
                  <span className="title-underline">Generación</span>
                </span>
              </span>
            </h1>
            <div className="overflow-hidden mt-4 md:mt-6 lg:mt-10">
              <p className="title-line text-[11px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.7em] font-medium text-gray-400 ml-0 md:ml-2">
                Caminando juntos en la fe
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 pb-2 md:pb-4">
          <div className="hero-subtext space-y-4 md:space-y-6 lg:space-y-8 max-w-sm">
            <div className="w-10 md:w-12 h-px bg-gold" />
            <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed font-light">
              Renovando la fe a través de la comunidad, el servicio y la alegría de la juventud.
              Un espacio para crecer, compartir y transformar.
            </p>
            <div className="flex items-center gap-6 md:gap-8 pt-2 md:pt-4">
              <a
                href="#feed"
                className="btn-sweep inline-block px-5 md:px-6 lg:px-8 py-3 md:py-4 border border-charcoal text-[11px] uppercase tracking-[0.3em] font-bold"
              >
                Explorar Crónicas
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute right-24 top-0 w-px h-1/2 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
    </header>
  )
}
