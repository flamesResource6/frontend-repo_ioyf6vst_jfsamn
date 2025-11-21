import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero: React.FC = () => {
  return (
    <section className="relative h-[68vh] min-h-[460px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Glass morphic gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-950/90" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="backdrop-blur-md/50 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live listings • Updated in real-time
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Find your next home with confidence
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200/80 md:text-base">
            Explore properties for sale with pricing, details, and insights to make a confident buying decision.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
