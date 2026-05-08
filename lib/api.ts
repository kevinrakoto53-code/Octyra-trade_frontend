// lib/api.ts
import { getToken, removeToken } from "@/lib/auth"

const API = process.env.NEXT_PUBLIC_API_URL

export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()

  if (!token) {
    window.location.href = "/login"
    throw new Error("Non authentifié")
  }

  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!res.ok) {
    const data = await res.json()

    if (res.status === 401) {
      removeToken()
      window.location.href = "/login"
    }

    throw new Error(data.detail || "Erreur")
  }

  return res.json()
}

export const getBotTrades = (id: number) => authFetch(`/api/bots/${id}/trades`)
export const getBotProfit  = (id: number) => authFetch(`/api/bots/${id}/profit`)
export const getMe = () => authFetch("/api/users/me")
export const getMyPlan = () => authFetch("/api/users/my-plan")