// lib/api.ts
import { getToken, removeToken } from "@/lib/auth"

const API = process.env.NEXT_PUBLIC_API_URL

export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()

  if (!token) {
    window.location.href = "/login"
    throw new Error("Non authentifié")
  }

  // Timeout 15 secondes
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(`${API}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      const data = await res.json().catch(() => ({ detail: "Erreur serveur" }))

      if (res.status === 401) {
        removeToken()
        window.location.href = "/login"
      }

      throw new Error(data.detail || "Erreur")
    }

    return res.json()

  } catch (err: any) {
    clearTimeout(timeoutId)
    if (err.name === "AbortError") {
      throw new Error("Le serveur met trop de temps — réessaie dans quelques secondes 🕐")
    }
    throw err
  }
}

// ── Helpers existants ─────────────────────────────────────
export const getBotTrades = (id: number) => authFetch(`/api/bots/${id}/trades`)
export const getBotProfit  = (id: number) => authFetch(`/api/bots/${id}/profit`)
export const getMe         = ()           => authFetch("/api/users/me")
export const getMyPlan     = ()           => authFetch("/api/users/my-plan")

// ── Nouveaux helpers ──────────────────────────────────────
export const getPrices     = ()           => authFetch("/api/market/prices")
export const getPrice      = (asset: string) => authFetch(`/api/market/price/${asset}`)
export const getSignals    = ()           => authFetch("/api/signals/")
export const getSignal     = (asset: string) => authFetch(`/api/signals/${asset}`)
export const getNews       = ()           => authFetch("/api/news/")
export const getBots       = ()           => authFetch("/api/bots/")
export const getPlans      = ()           => authFetch("/api/plans/")
export const getCurrentPlan = ()          => authFetch("/api/plans/current")
export const upgradePlan   = (id: number) => authFetch(`/api/plans/upgrade/${id}`, { method: "POST" })