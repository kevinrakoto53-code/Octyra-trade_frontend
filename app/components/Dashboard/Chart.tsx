"use client"
import { useEffect, useRef, useState } from "react"
import { createChart, CandlestickSeries, IChartApi, ISeriesApi, UTCTimestamp } from "lightweight-charts"
import { createCandleSocket, createAssetPriceSocket } from "@/lib/socket"
import { Skeleton } from "@/components/ui/skeleton"
import type { SocketHandle } from "@/lib/socket"

interface Candle {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// ── WebSockets en dehors du composant ────────────────────
let wsCandleGlobal: SocketHandle | null = null
let wsPriceGlobal:  SocketHandle | null = null

export default function BotChart() {
  const chartRef      = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | null>(null)
  const seriesRef     = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const candlesRef    = useRef<Candle[]>([])
  const [candles, setCandles] = useState<Candle[]>([])

  useEffect(() => {
    candlesRef.current = candles
  }, [candles])

  // ── WebSocket bougies ─────────────────────────────────
  useEffect(() => {
    if (!wsCandleGlobal) {
      wsCandleGlobal = createCandleSocket("BTC", "1d", "1m", (newCandles) => {
        setCandles(newCandles)
      })
    }
  }, [])

  // ── Création du chart ─────────────────────────────────
  useEffect(() => {
    if (!chartRef.current || !candles.length) return

    if (!chartInstance.current) {
      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: "#0f0f0f" },
          textColor: "#d1d5db",
        },
        grid: {
          vertLines: { color: "#1f1f1f" },
          horzLines: { color: "#1f1f1f" },
        },
        crosshair: {
          vertLine: { color: "#555" },
          horzLine: { color: "#555" },
        },
        timeScale: {
          borderColor: "#333",
          timeVisible: true,
        },
        rightPriceScale: {
          borderColor: "#333",
        },
      })

      chartInstance.current = chart

      const series = chart.addSeries(CandlestickSeries, {
        upColor:         "#22c55e",
        downColor:       "#ef4444",
        borderUpColor:   "#22c55e",
        borderDownColor: "#ef4444",
        wickUpColor:     "#22c55e",
        wickDownColor:   "#ef4444",
      })

      seriesRef.current = series

      const handleResize = () => {
        if (chartRef.current)
          chart.applyOptions({ width: chartRef.current.clientWidth })
      }
      window.addEventListener("resize", handleResize)
    }

    if (seriesRef.current) {
      const formatted = candles.map((c) => ({
        time:  Math.floor(c.timestamp / 1000) as UTCTimestamp,
        open:  c.open,
        high:  c.high,
        low:   c.low,
        close: c.close,
      }))
      seriesRef.current.setData(formatted)
      chartInstance.current?.timeScale().fitContent()
    }
  }, [candles])

  // ── WebSocket prix live ───────────────────────────────
  useEffect(() => {
    if (!wsPriceGlobal) {
      wsPriceGlobal = createAssetPriceSocket("BTC", (newPrice) => {
        if (!seriesRef.current) return
        const current = candlesRef.current
        if (!current.length) return

        const last = current[current.length - 1]

        seriesRef.current.update({
          time:  Math.floor(last.timestamp / 1000) as UTCTimestamp,
          open:  last.open,
          high:  Math.max(last.high, newPrice.price),
          low:   Math.min(last.low, newPrice.price),
          close: newPrice.price,
        })
      })
    }
  }, [])

  if (!candles.length) return (
    <div className="flex w-full justify-center max-w-4xl flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )

  return (
    <div className="p-4 bg-[#0f0f0f] rounded-xl border border-zinc-800">
      <p className="text-white text-sm mb-3 font-medium underline underline-offset-6">BTC/USDT</p>
      <div ref={chartRef} className="w-full" />
    </div>
  )
}