"use client"
import { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/SideBar";
import Footer from "@/app/components/Dashboard/Footer";
import { getMe } from "@/lib/api";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  plan_id: number;
  created_at: string;
  plan: {
    id: number;
    name: string;
    max_bots: number;
    email_alerts: boolean;
    api_access: boolean;
    backtesting: boolean;
    price: number;
  } | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(console.error)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-white/5">
      
      <div className="shrink-0 md:px-30">
        <Sidebar user={{
          full_name: user?.full_name ?? "...",  
          plan: { name: user?.plan?.name ?? "..." } 
        }} />
      </div>

      <main className="flex-1 h-screen overflow-y-auto flex flex-col">
        <div className="flex-1 px-8">
          {children}
        </div>
        <Footer />
      </main>

    </div>
  )
}