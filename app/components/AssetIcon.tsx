// app/components/AssetIcon.tsx

export const ICONS: Record<string, string> = {
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
}

export function AssetIcon({ asset }: { asset: string }) {
  if (!asset) return null
  const icon = ICONS[asset]

  if (!icon)
    return (
      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white">
        {asset.slice(0, 2)}
      </div>
    )

  if (icon.length < 10) return <span className="text-2xl">{icon}</span>

  return (
    <img
      src={icon}
      alt={asset}
      width={24}
      height={24}
      className="rounded-full"
    />
  )
}