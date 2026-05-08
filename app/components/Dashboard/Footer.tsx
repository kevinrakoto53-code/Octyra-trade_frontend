import Image from "next/image";
import { Send } from "lucide-react";
import { FaGithub, FaTwitter, FaTelegram } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="font-lora rounded-2xl bg-linear-to-br from-gray-900 via-gray-950 to-orange-950 border-t border-white/10">

      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row gap-10 justify-between">

        <div className="flex flex-col gap-2 max-w-xs">

          <div className="flex gap-3 mt-2">
            <button className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
              <FaTelegram className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
              <FaGithub className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
              <FaTwitter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-2 max-w-xs">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold">Stay updated</p>
          <p className="text-sm text-zinc-400">Get the latest AI trading signals in your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
            />
            <button className="bg-orange-500 hover:bg-orange-600 transition px-3 py-2 rounded-lg">
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 max-w-5xl mx-auto">
        <p className="text-xs text-zinc-600">© 2026 OCTYRA. All rights reserved.</p>
        <p className="text-xs text-zinc-600">Built with ❤️ for smarter trading</p>
      </div>

    </footer>
  )
}