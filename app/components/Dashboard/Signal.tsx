"use client";
import { TrendingUp, TrendingDown, Pause } from "lucide-react";
import { authFetch } from "@/lib/api";
import { useState, useEffect } from "react";
import { AssetIcon } from "@/app/components/AssetIcon";
import { ArrowBigRightDash } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"

interface Signals {
  rf_signal: string;
  xgb_signal: string;
  final_decision: string;
  confidence: number;
  asset: string;
}

export default function Signal() {
  const [signal, setSignal] = useState<Signals[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignals = () => {
      authFetch("/api/signals/")
        .then(setSignal)
        .catch(console.error)
        .finally(() => setLoading(false));
    };

    fetchSignals();
    const interval = setInterval(fetchSignals, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="flex w-full max-w-sm flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div> ;

  return (
    <div className="rounded-xl gap-3 p-5 bg-linear-to-r from-pink-900 via-transparent to-orange-700">
      {signal.map((signal, index) => (  // ✅ index ajouté
        <div
          key={`${signal.asset}-${index}`}
          className="flex border p-2 rounded-2xl text-sm items-center justify-between bg-black/70 gap-2 font-bold mb-2"
        >
          <div className="flex gap-2 items-center">
            <AssetIcon asset={signal.asset} />
            <p>{signal.asset}</p>
          </div>

          <div className="flex items-center text-sm gap-3">
            <div className={`flex items-center gap-1 ${
              signal.final_decision === "BUY"  ? "text-green-500 border border-green-500 p-1 rounded-lg bg-green-900/60" :
              signal.final_decision === "SELL" ? "text-red-500 border border-red-500 p-1 rounded-lg bg-red-900/40" :
              signal.final_decision === "HOLD" ? "text-yellow-500 border border-yellow-500 p-1 rounded-lg bg-yellow-600/40" :
              "text-gray-500"
            }`}>
              {signal.final_decision}
              {signal.final_decision === "BUY"  ? <TrendingUp size={16} /> :
               signal.final_decision === "SELL" ? <TrendingDown size={16} /> :
               signal.final_decision === "HOLD" ? <Pause size={16} /> : null}
            </div>
            <p className="flex gap-2 text-sm">
              <ArrowBigRightDash className="" />
               {(signal.confidence * 100).toFixed(0)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}