"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth";  // ← importez votre fonction logout
import {
  LayoutDashboard,
  Bot,
  Newspaper,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/bots", label: "Mes bots", icon: Bot },
  { href: "/dashboard/plan", label: "Mon plan", icon: CreditCard },
  { href: "/dashboard/news", label: "News", icon: Newspaper },
  { href: "/dashboard/chat", label: "ARIA", icon: MessageCircle },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

interface SidebarProps {
  user?: {
    full_name: string
    plan?: { name: string }
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()  // ← supprime le token et redirige vers /login
  }

  return (
    <aside className={`
      h-screen flex flex-col border-r bg-linear-to-bl from-taupe-700/50 via-gray-900/60 to-orange-900/50
      transition-all duration-300 ease-in-out
      ${collapsed ? "w-16" : "w-40"}
    `}>

      {/* Header + bouton plier */}
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <h1 className="text-lg font-bold">
            OCT <span className="text-orange-500">YRA</span>
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-muted-foreground hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200
              ${collapsed ? "justify-center" : ""}
              ${pathname === href
                ? "bg-linear-to-r from-transparent via-orange-700/50 to-taupe-700/50 scale-110 text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
            title={collapsed ? label : ""}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer user */}
      <div className="p-3 bg-linear-to-br from-orange-800/50 to-taupe-800/50 rounded-2xl">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-md ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
            {user?.full_name?.[0] ?? "?"}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.plan?.name}
              </p>
            </div>
          )}

          {!collapsed && (
            <LogOut
              size={16}
              onClick={handleLogout}  // ✅ logout au clic
              className="text-muted-foreground cursor-pointer hover:scale-110 hover:text-red-400 transition-colors"
            />
          )}
        </div>

        {/* LogOut visible quand plié */}
        {collapsed && (
          <div className="flex justify-center mt-2">
            <LogOut
              size={16}
              onClick={handleLogout}  // ✅ logout au clic
              className="text-muted-foreground cursor-pointer hover:text-red-400 transition-colors"
            />
          </div>
        )}
      </div>
    </aside>
  )
}