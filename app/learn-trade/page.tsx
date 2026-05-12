"use client"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"

const lessons = [
  {
    title: "What is RSI?",
    color: "bg-orange-500",
    desc: "The Relative Strength Index measures momentum. Above 70 = overbought, below 30 = oversold.",
    tip: "💡 Use RSI to spot reversals before they happen."
  },
  {
    title: "MACD Explained",
    color: "bg-purple-600",
    desc: "MACD shows the relationship between two moving averages. A crossover = potential trend change.",
    tip: "💡 Combine MACD with volume for stronger signals."
  },
  {
    title: "Bollinger Bands",
    color: "bg-blue-600",
    desc: "Bands that expand and contract with volatility. Price touching the band = potential reversal.",
    tip: "💡 Squeeze = big move coming. Watch carefully."
  },
  {
    title: "Risk Management",
    color: "bg-green-600",
    desc: "Never risk more than 2% per trade. Use stop-loss orders to protect your capital always.",
    tip: "💡 The goal is to stay in the game, not win every trade."
  },
  {
    title: "Support & Resistance",
    color: "bg-red-600",
    desc: "Key price levels where buying or selling pressure is strong. Break = continuation signal.",
    tip: "💡 These levels work because everyone watches them."
  },
  {
    title: "Candlestick Patterns",
    color: "bg-yellow-600",
    desc: "Doji, Hammer, Engulfing — each candle tells a story about buyer vs seller battles.",
    tip: "💡 Master 5 patterns and you'll have an edge."
  },
]

export default function LearnTrade() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="flex items-center gap-2 text-orange-400 mb-10 hover:text-orange-300">
          <FaArrowLeft /> Back
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Learn <span className="text-orange-400">Trading</span></h1>
          <p className="text-xl text-zinc-400">Master the fundamentals — from beginner to pro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {lessons.map((lesson, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition">
              <div className={`${lesson.color} text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4`}>
                Lesson {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{lesson.desc}</p>
              <p className="text-orange-400 text-sm">{lesson.tip}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/register" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-10 rounded-full text-lg transition">
            Start Trading with OCTYRA →
          </Link>
        </div>
      </div>
    </div>
  )
}