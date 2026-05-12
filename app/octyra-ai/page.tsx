"use client"
import Link from "next/link"
import { FaArrowLeft, FaBrain, FaChartLine, FaRobot, FaShieldAlt } from "react-icons/fa"

export default function OctyraAI() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="flex items-center gap-2 text-orange-400 mb-10 hover:text-orange-300">
          <FaArrowLeft /> Back
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Meet <span className="text-orange-400">ARIA</span></h1>
          <p className="text-xl text-zinc-400">Your AI-powered trading assistant — available 24/7</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <FaBrain className="text-orange-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
            <p className="text-zinc-400">ARIA analyzes RSI, MACD, Bollinger Bands and gives you real-time trading signals.</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <FaChartLine className="text-orange-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Price Predictions</h3>
            <p className="text-zinc-400">Powered by XGBoost and Random Forest ML models trained on years of market data.</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <FaRobot className="text-orange-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trading Bots</h3>
            <p className="text-zinc-400">Automate your trading strategy with intelligent bots that react in milliseconds.</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <FaShieldAlt className="text-orange-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
            <p className="text-zinc-400">ARIA monitors your portfolio and alerts you before losses exceed your threshold.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/login" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-10 rounded-full text-lg transition">
            Try ARIA Now →
          </Link>
        </div>
      </div>
    </div>
  )
}