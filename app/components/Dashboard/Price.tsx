"use client";
import { useEffect, useRef, useState } from "react";
import { createPriceSocket,SocketHandle  } from "@/lib/socket";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ICONS: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  BNB: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  DOGE: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  ADA: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  AVAX: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  EUR: "https://flagcdn.com/w40/eu.png",
  GBP: "https://flagcdn.com/w40/gb.png",
  JPY: "https://flagcdn.com/w40/jp.png",
  AUD: "https://flagcdn.com/w40/au.png",
  CAD: "https://flagcdn.com/w40/ca.png",
  CHF: "https://flagcdn.com/w40/ch.png",
  OR: "🥇",
  ARGENT: "🥈",
  PETROLE: "🛢️",
  GAZ: "🔥",
};

function AssetIcon({ asset }: { asset: string }) {
  const icon = ICONS[asset];
  if (!icon)
    return (
      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white">
        {asset.slice(0, 2)}
      </div>
    );
  if (icon.length < 10) return <span className="text-2xl">{icon}</span>;
  return (
    <img
      src={icon}
      alt={asset}
      width={24}
      height={24}
      className="rounded-full"
    />
  );
}

function format(value: number | null | undefined) {
  if (!value || value === 0) return "__";
  return value;
}

interface Price {
  asset: string;
  price: number;
  change_24h: number;
  currency: string;
  market_cap: number;
  circulating_supply: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
}

export default function PriceList() {
  const [prices, setPrices] = useState<Price[]>([]);
 const wsRef = useRef<SocketHandle | null>(null); 
  useEffect(() => {
    if (wsRef.current) return; // ← déjà connecté, on sort

    wsRef.current = createPriceSocket((newPrices) => {
      setPrices(newPrices);
    });

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  if (!prices.length)
    return (
      <Card className="bg-black/5 w-full max-w-4xl">
        <CardHeader>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
      </Card>
    );

  return (
    <div className="border border-white/20 rounded-2xl md:text-sm text-xs md:p-4 p-2 flex flex-col  gap-2">
      <div className="flex gap-3 items-center text-zinc-500 border-b border-zinc-800 pb-2 mb-1">             
        <p className="w-24 text-center">Asset</p>
        <p className="w-24 text-center">Price</p>
        <p className="w-16 text-center">24h %</p>
        <p className="hidden md:block text-center w-28">Market Cap</p>
        <p className="hidden text-center md:block w-28">Circulating</p>
        <p className="hidden text-center md:block w-28">Volume 24h</p>
        <p className="hidden text-center lg:block w-28">High 24h</p>
        <p className="hidden text-center lg:block w-28">Low 24h</p>
      </div>
      {prices.map((p) => (
        <div className="flex bg-base-100/50 rounded-2xl p-1 border-b border-white/20 gap-6 items-center px-1 py-2" key={p.asset}>
          <div className="w-20 flex gap-1 items-center">
          <AssetIcon asset={p.asset} />
          <h2>{p.asset}</h2>
          </div>
          <p className="w-18">{format(p.price)}</p>
          <p className={p.change_24h >= 0 ? "text-green-500 w-16"  : "text-red-500"}>
            {p.change_24h >= 0 ? "+" : ""}
            {format(p.change_24h)}%
          </p>
          <p className="hidden text-center w-28 md:block">{format(p.market_cap)}</p>
          <p className="hidden w-28 text-center md:block">{format(p.circulating_supply)}</p>
          <p className="hidden w-28 text-center md:block">{format(p.volume_24h)}</p>
          <p className="hidden w-28 text-center lg:block">{format(p.high_24h)}</p>
          <p className="hidden w-28 text-center lg:block">{format(p.low_24h)}</p>
        </div>
      ))}
    </div>
  );
}
