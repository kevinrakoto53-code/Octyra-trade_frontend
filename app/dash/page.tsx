"use client"
import { useEffect, useState } from "react"
import { createPriceSocket } from "@/lib/socket"

interface Price {
  asset: string
  price: number
  change_24h: number
  currency: string
}

export default function Price() {
  const [prices, setPrices] = useState<Price[]>([])

  useEffect(() => {
    const ws = createPriceSocket((newPrices) => {
      setPrices(newPrices)
    })

    return () => ws.close() // ferme quand on quitte la page
  }, [])

  if (!prices.length) return <p>Connexion...</p>

  return (
    <div>
      {prices.map((p) => (
        <p key={p.asset}>{p.asset} — ${p.price}</p>
      ))}
    </div>
  )
}