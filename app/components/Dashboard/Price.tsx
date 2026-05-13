"use client"
import { useEffect, useRef, useState } from "react"
import { createPriceSocket, SocketHandle } from "@/lib/socket"

const POPULAR_ASSETS = ["BTC", "ETH", "SOL", "BNB", "OR", "PETROLE", "EUR", "GBP"]

interface Price {
  asset: string
  name: string
  price: number
  change_24h: number
  currency: string
  market_cap: number | null
  circulating_supply: number | null
  volume_24h: number | null
  high_24h: number | null
  low_24h: number | null
}

function SkeletonRow() {
  return (
    <div className="flex gap-6 items-center px-1 py-2 border-b border-white/10">
      <div className="w-20 h-6 bg-zinc-800 animate-pulse rounded-lg" />
      <div className="w-18 h-6 bg-zinc-800 animate-pulse rounded-lg" />
      <div className="w-16 h-6 bg-zinc-800 animate-pulse rounded-lg" />
      <div className="hidden md:block w-28 h-6 bg-zinc-800 animate-pulse rounded-lg" />
      <div className="hidden md:block w-28 h-6 bg-zinc-800 animate-pulse rounded-lg" />
      <div className="hidden md:block w-28 h-6 bg-zinc-800 animate-pulse rounded-lg" />
    </div>
  )
}

const ICONS: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  BNB: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  DOGE: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  ADA: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  AVAX: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  EUR: "https://flagcdn.com/w40/eu.png",
  GBP: "https://flagcdn.com/w40/gb.png",
  JPY: "https://flagcdn.com/w40/jp.png",
  AUD: "https://flagcdn.com/w40/au.png",
  CAD: "https://flagcdn.com/w40/ca.png",
  CHF: "https://flagcdn.com/w40/ch.png",
  OR: "🥇",
  ARGENT: "🥈",
  PETROLE: "🛢️",
  GAZ: "🔥",
}

function AssetIcon({ asset }: { asset: string }) {
  const icon = ICONS[asset]
  if (!icon) return (
    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white">
      {asset.slice(0, 2)}
    </div>
  )
  if (icon.length < 10) return <span className="text-xl">{icon}</span>
  return <img src={icon} alt={asset} width={28} height={28} className="rounded-full" />
}

function fmt(value: number | null | undefined) {
  if (!value || value === 0) return "—"
  if (value > 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value > 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  return value.toLocaleString()
}

export default function PriceList() {
  const [prices, setPrices] = useState<Price[]>([])
  const [showAll, setShowAll] = useState(false)
  const wsRef = useRef<SocketHandle | null>(null)

  useEffect(() => {
    if (wsRef.current) return

    wsRef.current = createPriceSocket((newPrices) => {
      setPrices(newPrices)
    })

    return () => {
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [])

  // Filtre selon showAll
  const displayed = showAll
    ? prices
    : prices.filter(p => POPULAR_ASSETS.includes(p.asset))

  return (
    <div className="border border-white/20 rounded-2xl text-xs md:text-sm md:p-4 p-2 flex flex-col gap-2">

      {/* Header */}
      <div className="flex gap-3 items-center text-zinc-500 border-b border-zinc-800 pb-2 mb-1">
        <p className="w-24 text-center">Asset</p>
        <p className="w-24 text-center">Prix</p>
        <p className="w-16 text-center">24h %</p>
        <p className="hidden md:block text-center w-28">Market Cap</p>
        <p className="hidden md:block text-center w-28">Volume 24h</p>
        <p className="hidden lg:block text-center w-28">High 24h</p>
        <p className="hidden lg:block text-center w-28">Low 24h</p>
      </div>

      {/* Skeleton si pas encore chargé */}
      {!prices.length && (
  <div className="flex flex-col gap-2">
    <p className="text-zinc-500 text-xs text-center py-2 animate-pulse">
      ⏳ Chargement des prix depuis les marchés...
    </p>
    {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
  </div>
)}

      {/* Lignes des prix */}
      {displayed.map((p) => (
        <div
          key={p.asset}
          className="flex bg-base-100/50 rounded-2xl border-b border-white/10 gap-6 items-center px-1 py-2"
        >
          <div className="w-20 flex gap-2 items-center">
            <AssetIcon asset={p.asset} />
            <div className="flex flex-col">
              <span className="font-medium">{p.asset}</span>
              <span className="text-zinc-500 text-xs hidden md:block">{p.name}</span>
            </div>
          </div>

          <p className="w-18 font-mono">
            {p.price > 1 ? `$${p.price.toLocaleString()}` : `$${p.price}`}
          </p>

          <p className={`w-16 font-medium ${p.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
            {p.change_24h >= 0 ? "+" : ""}{p.change_24h?.toFixed(2)}%
          </p>

          <p className="hidden md:block text-center w-28 text-zinc-400">
            {fmt(p.market_cap)}
          </p>

          <p className="hidden md:block text-center w-28 text-zinc-400">
            {fmt(p.volume_24h)}
          </p>

          <p className="hidden lg:block text-center w-28 text-zinc-400">
            {p.high_24h ? `$${p.high_24h.toLocaleString()}` : "—"}
          </p>

          <p className="hidden lg:block text-center w-28 text-zinc-400">
            {p.low_24h ? `$${p.low_24h.toLocaleString()}` : "—"}
          </p>
        </div>
      ))}

      {/* Bouton voir plus / voir moins */}
      {prices.length > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 py-2 px-4 rounded-xl border border-white/20 text-zinc-400 hover:text-white hover:border-orange-500 transition-all duration-300 text-sm"
        >
          {showAll ? "Voir moins ↑" : `Voir tout (${prices.length} assets) ↓`}
        </button>
      )}
    </div>
  )
}