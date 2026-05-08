"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

type Step = "email" | "sent";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue.");
        return;
      }

      // ✅ Peu importe si l'email existe ou pas → on affiche toujours "envoyé"
      // (sécurité : ne pas révéler si un email est enregistré)
      setStep("sent");
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-black p-6 md:p-12">
      <div className="w-full h-full md:max-w-7xl md:h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden border border-orange-500/50">

        {/* GAUCHE — même style que login */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full
            bg-linear-to-br from-orange-500/70 to-transparent
            border border-orange-400/60
            shadow-[0_0_200px_60px_rgba(255,120,0,0.5),inset_0_0_40px_rgba(255,120,0,0.8)]"
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full
            bg-linear-to-tl from-orange-500/80 to-transparent
            border border-orange-400/30
            shadow-[0_0_200px_60px_rgba(255,120,0,0.3),inset_0_0_40px_rgba(255,120,0,0.6)]"
          />

          <Link
            className="absolute top-4 left-4 text-white text-2xl hover:text-orange-500 transition-colors"
            href="/login"
          >
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
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-neutral-950 gap-2 flex flex-col items-center justify-center px-8">

          {step === "email" ? (
            <>
              <div className="font-lora text-center">
                <h1 className="font-bold text-2xl tracking-wide">
                  Forgot <span className="text-orange-500">Password</span>
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <div className="w-50 h-0.5 bg-linear-to-r from-orange-900 via-orange-400 to-orange-900 shadow-[0_0_10px_3px_rgba(249,115,22,0.6)]" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 w-full max-w-sm">
                <div>
                  <Label
                    className="px-3 pb-2 text-white font-semibold font-lora"
                    htmlFor="email"
                  >
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
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="text-gray-500 text-sm">
                Remember your password?{" "}
                <Link href="/login" className="text-orange-500 hover:underline transition-all hover:font-lora">
                  Sign in
                </Link>
              </p>
            </>

          ) : (
            /* ✅ Step 2 — Email envoyé */
            <>
              <div className="flex flex-col items-center gap-4 text-center max-w-sm">

                {/* Icône success */}
                <div className="w-16 h-16 rounded-full border border-orange-500/50 
                  bg-orange-500/10 flex items-center justify-center
                  shadow-[0_0_30px_5px_rgba(249,115,22,0.2)]">
                  <FaEnvelope className="text-orange-500 text-2xl" />
                </div>

                <div className="font-lora">
                  <h1 className="font-bold text-2xl tracking-wide">
                    Check your <span className="text-orange-500">Email</span>
                  </h1>
                  <p className="text-sm text-gray-400 mt-2">
                    We sent a reset link to{" "}
                    <span className="text-white font-semibold">{email}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    The link expires in <span className="text-orange-400">15 minutes</span>
                  </p>
                </div>

                <div className="w-50 h-0.5 bg-linear-to-r from-orange-900 via-orange-400 to-orange-900 shadow-[0_0_10px_3px_rgba(249,115,22,0.6)]" />

                {/* Renvoyer l'email */}
                <p className="text-gray-500 text-sm">
                  Didn't receive it?{" "}
                  <button
                    onClick={() => setStep("email")}
                    className="text-orange-500 hover:underline"
                  >
                    Try again
                  </button>
                </p>

                <Link
                  href="/login"
                  className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <FaArrowLeft size={12} /> Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}