"use client";
import { Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Price from "../components/Dashboard/Price"
import Chart from "../components/Dashboard/Chart"

export default function DashboardPage() {
  return (
    <main className="flex-1 h-screen rounded-2xl bg-linear-to-bl from-orange-300/35 via-transparent to-pink-500/15 overflow-auto px-4">
      <section className="flex items-center justify-between gap-4 mb-8">
        <h2 className="font-lora text-xl tracking-wider">Dashboard</h2>
        <div className="flex gap-3">
          <h3 className="text-xs border bg-amber-400/50 text-white hover:font-bold font-lora flex items-center rounded-2xl px-2">Free</h3>
          <Moon
            size={24}
            className="text-muted-foreground cursor-pointer hover:scale-110 fill-gray-700 hover:text-white transition-colors"
          />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Chart />
        <Price />
      </section>
    </main>
  )
}