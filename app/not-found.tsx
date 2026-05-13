"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <div className="text-9xl font-bold text-orange-500">404</div>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-zinc-400">The page you are looking for doesn't exist.</p>
      <Link href="/" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full transition">
        Back to OCTYRA →
      </Link>
    </div>
  )
}