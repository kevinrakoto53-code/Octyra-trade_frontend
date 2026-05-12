"use client"
import Link from "next/link"
import { FaArrowLeft, FaEnvelope, FaDiscord, FaGithub } from "react-icons/fa"
import { useState } from "react"

const faqs = [
  { q: "How do I get started?", a: "Create a free account, connect your exchange API, and let ARIA guide you." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted. We never store your exchange private keys." },
  { q: "What exchanges are supported?", a: "Binance, Coinbase, Kraken and more via CCXT integration." },
  { q: "How accurate are the signals?", a: "Our ML models achieve 70-80% accuracy on backtests. Always use risk management." },
  { q: "Can I use OCTYRA for free?", a: "Yes! The free plan includes basic signals and ARIA chat." },
]

export default function Help() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="flex items-center gap-2 text-orange-400 mb-10 hover:text-orange-300">
          <FaArrowLeft /> Back
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Customer <span className="text-orange-400">Service</span></h1>
          <p className="text-xl text-zinc-400">We are here to help you succeed</p>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a href="mailto:kevinrakoto53@gmail.com" className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition text-center">
            <FaEnvelope className="text-orange-400 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-zinc-400 text-sm">kevinrakoto53@gmail.com</p>
          </a>
          <a href="https://github.com/kevinrakoto53-code" target="_blank" className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition text-center">
            <FaGithub className="text-orange-400 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">GitHub</h3>
            <p className="text-zinc-400 text-sm">Report issues & contribute</p>
          </a>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 text-center">
            <FaDiscord className="text-orange-400 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Discord</h3>
            <p className="text-zinc-400 text-sm">Coming soon</p>
          </div>
        </div>

        {/* FAQ */}
        <p className="text-3xl font-bold mb-8">Frequently Asked <span className="text-orange-400">Questions</span></p>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:text-orange-400 transition"
              >
                {faq.q}
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-zinc-400">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}