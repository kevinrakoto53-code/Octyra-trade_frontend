"use client";
import {
  BrainCircuit,
  Zap,
  ShieldCheck,
  ChartNoAxesCombined,
  Bot,
  Bitcoin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Feat() {
  const steps = [
    {
      icon: BrainCircuit,
      title: "AI Analysis",
      description:
        "Real-time AI detecting high-probability trades before the market reacts.",
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Execute trades in milliseconds with zero emotional bias.",
    },
    {
      icon: ShieldCheck,
      title: "Risk Control",
      description:
        "Built-in risk engine protecting your capital on every trade.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Market Insights",
      description:
        "Deep chart analysis and trend detection give you a clear edge over traditional trading strategies.",
    },
    {
      icon: Bot,
      title: "Automated Trading",
      description:
        "Let your bot trade 24/7 without interruption, following your strategy with perfect discipline.",
    },
    {
      icon: Bitcoin,
      title: "Crypto Ready",
      description:
        "Fully compatible with major crypto assets, from Bitcoin to altcoins, across multiple exchanges.",
    },
  ];

  return (
    <div className="max-w-screen mx-auto p-4 md:px-8  min-h-screen overflow-hidden section-bg z-10 backdrop-blur-xl">
      <section className="mt-12 flex flex-col">
        <div className="mt-8 flex flex-col gap-3 items-center justify-center">
          <h2 className="uppercase border shadow-md shadow-orange-700 border-[#e85000] p-1 px-3 font-lora text-sm rounded-3xl font-light">
            powerful features
          </h2>
          <h1 className="uppercase tracking-widest text-lg font-bold font-lora">
            built for smart <span className="text-[#e85000]">Traders</span>
          </h1>
          <p className="italic text-sm font-extralight tracking-tight">
            Discover what makes our AI trading système unique
          </p>
          <div className="w-12 h-1 bg-orange-700 mt-5 rounded-full mb-4" />
        </div>
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 mx-16 md:px-20 md:gap-16 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 40px rgba(255,120,0,0.4)",
                }} transition={{ type: "spring", stiffness: 200 }}
                className="card-shine flex flex-col items-center text-center gap-4 p-6 bg-orange-500/5 animate-[pulseGlow_3s_infinite] border-orange-500/60"
              >
                <Icon size={40} color="#e85000" />
                <h3 className="font-bold text-lg font-lora">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
