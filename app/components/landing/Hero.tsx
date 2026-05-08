import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center z-20">
      <div className="h-155" />

      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="font-lora text-4xl font-semibold tracking-widest mb-4">
            Everything you need to outperform the
            <span className="text-[#e85000] font-bold"> Market</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-widest uppercase">
             STRATEGY • PRECISION • CONTROL
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3 bg-[#e85000] hover:bg-[#ff6a1a] transition-colors rounded-lg text-white font-medium tracking-wider text-sm uppercase"
          >
            Get Started
          </Link>
          <Link
            href="/learn-more"
            className="px-8 py-3 border border-[#e85000]/50 hover:border-[#e85000] transition-colors rounded-lg text-white/70 hover:text-white text-sm uppercase tracking-wider"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}