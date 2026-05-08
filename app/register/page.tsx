"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRegister, apiLogin } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("API_URL =", process.env.NEXT_PUBLIC_API_URL);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // 1. Inscription
      await apiRegister({ full_name: fullName, email, password });

      // 2. Login automatique après inscription ✅
      await apiLogin(email, password, false);

      // 3. Redirect dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            <h1 className="font-bold text-2xl tracking-wide">Register</h1>
            <p className="text-sm text-gray-400">Create your account to get started</p>
          </div>
          <div className="w-50 h-0.5 bg-linear-to-r from-orange-900 via-orange-400 to-orange-900 shadow-[0_0_10px_3px_rgba(249,115,22,0.6)]" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 w-full max-w-sm px-6">

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="name">
                Full <span className="text-orange-700">Name</span>
              </Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input className="pl-9" type="text" id="name" placeholder="Full Name"
                  value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
            </div>

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="email">
                Email <span className="text-orange-700">Address</span>
              </Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input className="pl-9" type="email" id="email" placeholder="Email Address"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="password">
                Your <span className="text-orange-700">Password</span>
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input className="pl-9 pr-9" type={showPass ? "text" : "password"}
                  id="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <Label className="px-3 pb-2 text-white font-semibold font-lora" htmlFor="confirmPassword">
                Confirm <span className="text-orange-700">Password</span>
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <Input className="pl-9 pr-9" type={showConfirm ? "text" : "password"}
                  id="confirmPassword" placeholder="••••••••"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`text-xs mt-1 px-1 ${password === confirmPassword ? "text-green-400" : "text-red-400"}`}>
                  {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || password !== confirmPassword}
              className="bg-linear-to-tl from-orange-800 via-transparent to-orange-800 
              border border-orange-500 text-white hover:scale-105 transform 
              transition-all p-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:underline transition-all hover:font-lora">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}