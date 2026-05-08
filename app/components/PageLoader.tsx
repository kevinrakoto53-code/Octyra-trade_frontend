'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-9998 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">

      <div className="relative w-16 h-16">
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
              animation: 'spin 1.2s linear infinite',
              animationDelay: `${-(i / 16) * 1.2}s`,
            }}
          />
        ))}
      </div>

      <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Loading...</p>

    </div>
  )
}