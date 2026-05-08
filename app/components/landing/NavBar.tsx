"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed  backdrop-blur-2xl rounded-3xl top-0 left-0  right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/avatar-octyra.png"
            alt="logo"
            width={32}
            height={32}
            style={{ width: "32px", height: "32px" }}
          />
          <h1 className="font-bold tracking-widest">OCTYRA</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-white/70 text-sm">
          <Link href="/" className="hover:text-[#e85000] transition-colors">
            Home
          </Link>
          <Link
            href="/octyra-ai"
            className="hover:text-[#e85000] transition-colors"
          >
            Octyra AI
          </Link>
          <Link
            href="/learn-trade"
            className="hover:text-[#e85000] transition-colors"
          >
            Learn Trading
          </Link>
          <Link
            href="/help"
            className="hover:text-[#e85000] transition-colors"
          >
            Customer Service
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="hover:scale-105 hover:font-bold  bg-linear-to-br from-purple-700 to-orange-700 outline p-2 rounded-2xl outline-[#e85000] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-orange-900 font-semibold hover:bg-[#ff6a1a] transition-colors outline-2 outline-amber-700 p-1 rounded-md"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-white my-1 transition-all ${open ? "opacity-0" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-white/70 text-sm">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="hover:text-[#e85000] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/octyra-ai"
            onClick={() => setOpen(false)}
            className="hover:text-[#e85000] transition-colors"
          >
            Octyra AI
          </Link>
          <Link
            href="/learn-trade"
            onClick={() => setOpen(false)}
            className="hover:text-[#e85000] transition-colors"
          >
            Learn Trading
          </Link>
          <Link
            href="/help"
            onClick={() => setOpen(false)}
            className="hover:text-[#e85000] transition-colors"
          >
            Customer Service
          </Link>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2 border border-white/20 rounded-lg hover:border-[#e85000] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2 bg-[#e85000] rounded-lg text-white hover:bg-orange-900 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
