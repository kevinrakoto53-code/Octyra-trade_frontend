"use client"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { authFetch } from "@/lib/api"
import { getToken } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, ArrowBigUpDash, Loader2 } from "lucide-react"

const featureOne = [
  {
    id: 1,
    title: "Started",
    description: "For beginners exploring AI trading",
    price: 0,
    labels: ["1 trading bot", "Basic AI signals", "5 crypto pairs", "Email alerts", "Community access"],
    action: "Get Started",
  },
]

const featureTwo = [
  {
    id: 2,
    title: "Pro",
    description: "For serious traders who want an edge",
    price: 6,
    labels: ["5 trading bots", "Advanced AI analysis", "Unlimited crypto pairs", "Real-time alerts", "Priority support", "Backtesting engine"],
    action: "Start Trading Smarter 🚀",
  },
]

const featureThree = [
  {
    id: 3,
    title: "Elite",
    description: "Full power for professional traders",
    price: 35,
    labels: ["Unlimited bots", "Custom AI strategies", "Multi-exchange support", "API access", "Dedicated manager", "Live simulation"],
    action: "Contact Sales",
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleUpgrade = async (planId: number) => {
    const token = getToken()
    if (!token) {
      router.push("/login")
      return
    }

    try {
      setLoadingPlan(planId)
      setMessage("")

      await authFetch(`/api/plans/upgrade/${planId}`, { method: "POST" })

      setMessage("✅ Plan mis à jour avec succès !")
      setTimeout(() => router.push("/dashboard"), 1500)

    } catch (err) {
      setMessage("❌ Erreur — es-tu connecté ?")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-8 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,120,0,0.3)_0%,rgba(255,80,0,0.3)_25%,rgba(10,10,10,0.9)_40%,#000_100%)] -z-10" />

      {/* Header */}
      <section className="flex flex-col items-center gap-4 px-4 mb-8 font-lora">
        <h1 className="font-bold text-xl md:text-2xl tracking-wider text-center">
          Start winning with smarter trading 🚀
        </h1>
        <p className="text-sm font-light text-center text-zinc-400">
          Trusted by 12,000+ traders worldwide. No hidden fees. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-3 bg-black border border-orange-600/40 rounded-full px-5 py-2.5">
          <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-orange-900"}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-900"
          />
          <span className={`text-sm font-medium ${isYearly ? "text-white" : "text-orange-900"}`}>
            Yearly{" "}
            {isYearly && <span className="text-orange-400 font-semibold">(Save 30%)</span>}
          </span>
        </div>

        {/* Message feedback */}
        {message && (
          <p className={`text-sm font-medium px-4 py-2 rounded-lg ${
            message.includes("✅") ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"
          }`}>
            {message}
          </p>
        )}
      </section>

      {/* Cards */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">

        {/* Started */}
        {featureOne.map((feature) => (
          <div
            key={feature.title}
            className="w-full max-w-sm md:max-w-xs border bg-black/60 rounded-2xl px-4 py-6"
          >
            <Card className="bg-transparent text-white border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold uppercase font-lora tracking-wide">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-white/70 mt-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline font-lora">
                  <span className="text-3xl font-bold">${isYearly ? 0 : 0}</span>
                  <span className="ml-1 text-zinc-400">/mo</span>
                </div>
              </CardContent>
              <Separator className="bg-white/10" />
              <CardContent className="mt-4">
                <ul className="flex flex-col gap-2">
                  {feature.labels.map((label) => (
                    <li key={label} className="flex gap-2 items-start">
                      <Check className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-sm">{label}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <button
                onClick={() => handleUpgrade(feature.id)}
                disabled={loadingPlan === feature.id}
                className="border rounded-lg p-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full flex justify-center items-center gap-2 text-base font-bold capitalize mt-4 disabled:opacity-50"
              >
                {loadingPlan === feature.id ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>{feature.action}<ArrowBigUpDash size={18} /></>
                )}
              </button>
            </Card>
          </div>
        ))}

        {/* Pro */}
        {featureTwo.map((feature) => (
          <div key={feature.title} className="w-full max-w-sm md:max-w-xs relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap z-10">
              <p className="text-sm tracking-widest uppercase">Most popular</p>
            </div>
            <Card className="rounded-2xl border-2 border-orange-600 p-2 py-6 bg-black/60 overflow-visible text-white shadow-[0_0_15px_2px_rgba(220,80,0,0.4),inset_0_0_20px_0px_rgba(180,60,0,0.1)]">
              <CardHeader>
                <CardTitle className="uppercase text-orange-500 text-xl tracking-wider font-lora">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-white/70 mt-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="font-lora tracking-widest text-3xl font-bold">
                    ${isYearly ? Math.round(feature.price * 12 * 0.7) : feature.price}
                  </span>
                  <span className="ml-1 text-zinc-400">{isYearly ? "/yr" : "/mo"}</span>
                  {isYearly && <p className="ml-2 line-through text-zinc-500 text-sm">${feature.price * 12}</p>}
                </div>
                <p className="mt-2 text-xs bg-orange-600 text-green-400 w-max px-2 py-1 rounded-lg font-bold">
                  Best value — Save 30%
                </p>
              </CardContent>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {feature.labels.map((label) => (
                    <li key={label} className="flex gap-2 items-start">
                      <Check className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-sm">{label}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <button
                onClick={() => handleUpgrade(feature.id)}
                disabled={loadingPlan === feature.id}
                className="border border-orange-600 p-2 rounded-lg text-white bg-orange-600 hover:text-black hover:bg-white transition-colors duration-300 w-full text-base font-bold flex justify-center items-center gap-2 mt-2 disabled:opacity-50"
              >
                {loadingPlan === feature.id ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : feature.action}
              </button>
            </Card>
          </div>
        ))}

        {/* Elite */}
        {featureThree.map((feature) => (
          <div
            key={feature.title}
            className="w-full max-w-sm md:max-w-xs border bg-black/60 rounded-2xl px-4 py-6"
          >
            <Card className="bg-transparent text-white border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold uppercase font-lora tracking-wide">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-white/70 mt-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline font-lora">
                  <span className="text-3xl font-bold">
                    ${isYearly ? Math.round(feature.price * 12 * 0.7) : feature.price}
                  </span>
                  <span className="ml-1 text-zinc-400">{isYearly ? "/yr" : "/mo"}</span>
                </div>
              </CardContent>
              <Separator className="bg-white/10" />
              <CardContent className="mt-4">
                <ul className="flex flex-col gap-2">
                  {feature.labels.map((label) => (
                    <li key={label} className="flex gap-2 items-start">
                      <Check className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-sm">{label}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <button
                onClick={() => handleUpgrade(feature.id)}
                disabled={loadingPlan === feature.id}
                className="border flex justify-center items-center gap-2 rounded-lg py-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full text-base font-bold capitalize mt-4 disabled:opacity-50"
              >
                {loadingPlan === feature.id ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>{feature.action}<ArrowBigUpDash size={18} /></>
                )}
              </button>
            </Card>
          </div>
        ))}

      </section>

      <p className="mt-10 text-center text-zinc-400 text-sm px-4">
        All plans include a 14-day free trial. No credit card required
      </p>
    </div>
  )
}