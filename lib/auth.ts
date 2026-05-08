// lib/auth.ts
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export const saveToken = (token: string, remember: boolean = false) => {
 
  localStorage.removeItem("access_token")
  sessionStorage.removeItem("access_token")
  Cookies.remove("access_token")

  if (remember) {
    localStorage.setItem("access_token", token)
    Cookies.set("access_token", token, { expires: 7 })
  } else {
    sessionStorage.setItem("access_token", token)
    Cookies.set("access_token", token)
  }
}

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null

  return (
    Cookies.get("access_token") ??
    localStorage.getItem("access_token") ??
    sessionStorage.getItem("access_token") ??
    null
  )
}

export const removeToken = () => {
  Cookies.remove("access_token")
  localStorage.removeItem("access_token")
  sessionStorage.removeItem("access_token")
}

export const isAuthenticated = (): boolean => !!getToken()

export const apiRegister = async (payload: RegisterPayload): Promise<void> => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || "Registration failed")
  }
}

export const apiLogin = async (
  email: string,
  password: string,
  remember: boolean = false
): Promise<void> => {
  const body = new URLSearchParams()
  body.append("username", email)
  body.append("password", password)

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || "Login failed")
  }
  const tokens: AuthTokens = await res.json()
  saveToken(tokens.access_token, remember)
}

export const getUser = async () => {
  const token = getToken()
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }, 
  })
  return res.json()
}

export const logout = () => {
  removeToken()
  window.location.href = "/login"
}