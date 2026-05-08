"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { apiLogin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiLogin(email, password, remember);
      router.push("/dashboard"); // 👈 adapte selon ta route protégée
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-black p-6 md:p-12">
      <div className="w-full h-full md:max-w-7xl md:h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden border border-orange-500/50">

        {/* GAUCHE */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-linear-to-br from-orange-500/70 to-transparent border border-orange-400/60 shadow-[0_0_200px_60px_rgba(255,120,0,0.5),inset_0_0_40px_rgba(255,120,0,0.8)]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-linear-to-tl from-orange-500/80 to-transparent border border-orange-400/30 shadow-[0_0_200px_60px_rgba(255,120,0,0.3),inset_0_0_40px_rgba(255,120,0,0.6)]" />
          <Link className="absolute top-4 left-4 text-white text-2xl hover:text-orange-500" href="/">
            <FaArrowLeft />
          </Link>
          <div className="font-lora flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl text-center font-bold font-orbitron text-orange-500">
              OCT <span className="text-white">YRA</span>
            </h1>
            <h2 className="text-center text-xl font-semibold p-3 tracking-widest text-gray-300">
              Smarter trading starts here
            </h2>
          </div>
        </div>

        {/* DROITE */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-neutral-950 gap-2 flex flex-col items-center justify-center">
          <div className="font-lora text-center">
            <h1 className="font-bold text-2xl tracking-wide">Login</h1>
            <p className="text-sm text-gray-400">Welcome back! Please log in to your account</p>
          </div>
          <div className="w-50 h-0.5 bg-linear-to-r from-orange-900 via-orange-400 to-orange-900 shadow-[0_0_10px_3px_rgba(249,115,22,0.6)]" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 w-full max-w-sm px-6">

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="email">
                Email <span className="text-orange-700">Address</span>
              </Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input
                  className="pl-9"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="password">
                Your <span className="text-orange-700">Password</span>
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input
                  className="pl-9 pr-9"
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center gap-7">
              <div className="flex items-center px-3 gap-2">
                <Checkbox
                  checked={remember}
                  onCheckedChange={(v) => setRemember(v === true)}
                />
                <p className="text-sm text-gray-300">Remember me</p>
              </div>
              <Link href="/forgot-password">
                <p className="text-orange-500 hover:underline text-sm">Forgot password?</p>
              </Link>
            </div>

            {/* Erreur */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-linear-to-tl from-orange-800 via-transparent to-orange-800 
              border border-orange-500 text-white hover:scale-105 transform 
              transition-all p-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-orange-500 hover:underline transition-all hover:font-lora">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}