"use client";
import { Search, PencilLine, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItsWorks() {
  return (
    <section className="md:px-40 px-16 py-10 flex flex-col justify-center items-center bg-linear-to-b from-[#1d1c1c98] via-[#1a0d05] via-[#2a1206] to-[#0a0a0a] rounded-4xl">
      <div className="flex flex-col gap-4 items-start items-center ml-2">
        <h2 className="uppercase border border-orange-500 tracking-widest font-lora px-3 text-sm rounded-3xl ml-20">
          how it works
        </h2>
        <h1 className="capitalize text-2xl font-semibold tracking-widest pb-4  font-lora">
          up and running in 3 steps{" "}
        </h1>
      </div>

      <div className="w-54 md:w-96 h-1.5 bg-linear-to-r from-amber-600 my-8 rounded-2xl"/>

      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-3 ">
        <motion.div
          className="card bg-amber-900/30 w-66 shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 40px rgba(255,120,0,0.8)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="px-10 pt-10 ">
            <div className="bg-orange-800/40 w-9 flex items-center justify-center h-9 rounded-xl">
              <Search className="text-orange-500" />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title border rounded-xl mb-2 font-lora p-1 ">Connect your exchange</h2>
            <p>
              Link Binance Coinbase or Kraken in seconds via secure API keys
            </p>
            <div className="card-actions">
              <span className="text-orange-600 flex justify-center text-2xl font-bold font-lora bg-amber-900/80 p-2 rounded-xl underline underline-offset-4">
                01
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="card scale-105 my-4 bg-amber-900/50 w-66 shadow-sm"
          whileHover={{
            scale: 1.10,
            boxShadow: "0px 0px 40px rgba(255,120,0,0.8)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="px-10 pt-10 ">
            <div className="bg-orange-800/40 w-9 flex items-center justify-center h-9 rounded-xl">
              <PencilLine className="text-orange-500" />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title  border rounded-xl mb-2 font-lora p-1">Configure your Strategy</h2>
            <p>
              Choose from pre-built AI strategies or build your own with custom
              rules.
            </p>
            <div className="card-actions">
              <span className="text-orange-600 flex justify-center text-2xl font-bold font-lora bg-amber-900/80 p-2 rounded-xl underline underline-offset-4">
                02
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="card  bg-amber-900/65 w-66 shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 40px rgba(255,120,0,0.8)",
          }}
          transition={{ type: "spring", stiffness: 600 }}
        >
          <div className="px-10 pt-10 ">
            <div className="bg-orange-800/40 w-9 flex items-center justify-center h-9 rounded-xl">
              <ArrowRight className="text-orange-500" />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title  border rounded-xl mb-2 font-lora p-1">Let OCTYRA trade</h2>
            <p>
              Your bot runs 24h/7, scanning markets and execcuting trades on
              autopilot.
            </p>
            <div className="card-actions">
              <span className="text-orange-600 flex justify-center text-2xl font-bold font-lora bg-amber-900/50 p-2 rounded-xl underline underline-offset-4">
                03
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
