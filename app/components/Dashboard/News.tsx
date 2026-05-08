'use client'
import { authFetch } from "@/lib/api"
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface News {
  title: string
  source: string
  url: string
  content: string
  published_at: string
  image_url: string
  sentiment: string
  impact: number
  explanation: string
}

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    authFetch("/api/news/")
      .then(setNews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return  <div className="flex items-center jusice w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  if (!news.length) return <p className="text-center text-white py-10">Aucune news disponible</p>

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-3 py-4 px-4">

      <div>
        <h1 className="text-lg font-bold font-lora">
          Market <span className="text-orange-500">News</span>
        </h1>
        <p className="text-sm text-zinc-400">Actualités financières en temps réel</p>
      </div>

      {news.map((article, index) => (
  <div
    key={index}
    onClick={() => window.open(article.url, "_blank")}
    className="flex gap-3 p-3 rounded-xl border border-white/10 bg-black/30 hover:bg-white/5 transition group cursor-pointer"
  >
    {/* Image */}
    {article.image_url ? (
      <img
        src={article.image_url}
        alt={article.title}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />
    ) : (
      <div className="w-20 h-20 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center text-2xl">
        📰
      </div>
    )}

    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-orange-400 transition">
        {article.title}
      </p>
      <p className="text-xs text-zinc-400 line-clamp-2">
        {article.content}
      </p>
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-medium">{article.source}</span>
          <span className="text-xs text-zinc-600">
            {new Date(article.published_at).toLocaleDateString("fr-FR")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
            article.sentiment === "positive" ? "text-green-400 bg-green-900/40" :
            article.sentiment === "negative" ? "text-red-400 bg-red-900/40" :
            "text-yellow-400 bg-yellow-900/40"
          }`}>
            {article.sentiment === "positive" ? <TrendingUp size={10} /> :
             article.sentiment === "negative" ? <TrendingDown size={10} /> :
             <Minus size={10} />}
            {(article.impact * 100).toFixed(0)}%
          </div>
          <ExternalLink size={12} className="text-zinc-600 group-hover:text-orange-400 transition" />
        </div>
      </div>
    </div>
  </div>
))}
    </div>
  )
}