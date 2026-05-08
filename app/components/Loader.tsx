'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={`fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center gap-8 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute w-64 h-64 rounded-full
          bg-linear-to-b from-orange-600/80 to-transparent
          shadow-[0_0_120px_60px_rgba(200,60,0,0.6)]"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-widest text-white">
            OCT<span className="text-orange-500">YRA</span>
          </h1>
          <p className="mt-3 text-white/80 text-sm tracking-[0.3em] uppercase">
            Precision. Intelligence. Performance.
          </p>
          <p className="mt-4 text-orange-500 text-sm tracking-wider animate-pulse">
            Loading AI insights...
          </p>
        </div>
      </div>

      <div className="relative w-16 h-16 mt-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-400"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 22.5}deg) translateY(-28px)`,
              opacity: i / 16,
              boxShadow: '0 0 6px rgba(255,140,0,0.8)',
              animation: `spin 1.2s linear infinite`,
              animationDelay: `${-(i / 16) * 1.2}s`,
            }}
          />
        ))}
      </div>

    </div>
  )
}