// lib/socket.ts

const WS_URL = process.env.NEXT_PUBLIC_API_URL
  ?.replace("http", "ws")

// ── Types ─────────────────────────────────────────────────

interface Price {
  asset: string
  price: number
  change_24h: number
  currency: string
}

interface Candle {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface SocketHandle {
  close: () => void
}

// ── Fonction de base ──────────────────────────────────────

const createSocket = <T>(
  url: string,
  onMessage: (data: T) => void,
  label: string
): SocketHandle => {
  let ws: WebSocket
  let reconnectTimer: ReturnType<typeof setTimeout>

  const connect = () => {
    ws = new WebSocket(url)
    ws.onopen = () => console.log(`${label} connecté ✅`)
    ws.onmessage = (event: MessageEvent) => {
      onMessage(JSON.parse(event.data) as T)
    }
    ws.onclose = () => {
      console.log(`${label} déconnecté — reconnexion dans 3s...`)
      reconnectTimer = setTimeout(connect, 3000)
    }
    ws.onerror = () => {
      ws.close()
    }
  }

  connect()

  return {
    close: () => {
      clearTimeout(reconnectTimer)
      ws.close()
    }
  }
}

// ── Prix temps réel (un seul asset) ──────────────────────

export const createAssetPriceSocket = (
  asset: string,
  onMessage: (price: Price) => void
): SocketHandle => {
  return createSocket<Price>(
    `${WS_URL}/api/market/ws/price/${asset}`,
    onMessage,
    `Prix ${asset} WebSocket`
  )
}

// ── Prix temps réel (tous les assets) ────────────────────

export const createPriceSocket = (
  onMessage: (prices: Price[]) => void
): SocketHandle => {
  return createSocket<Price[]>(
    `${WS_URL}/api/market/ws/prices`,
    onMessage,
    "Prix WebSocket"
  )
}

// ── Candles temps réel ────────────────────────────────────

export const createCandleSocket = (
  asset: string,
  period: string = "5d",
  interval: string = "1h",
  onMessage: (candles: Candle[]) => void
): SocketHandle => {
  return createSocket<Candle[]>(
    `${WS_URL}/api/market/ws/candles/${asset}?period=${period}&interval=${interval}`,
    onMessage,
    `Candles ${asset} WebSocket`
  )
}