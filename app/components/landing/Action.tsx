import { ArrowBigRightDash } from "lucide-react"

export default function Action() {
  return (
    <div className="flex md:justify-center md:items-center justify-baseline items-baseline bg-neutral-900/70 py-12 px-10 flex-col gap-4 rounded-lg">
      <h2 className="text-lg tracking-wider font-bold">Ready to trade <span className="text-orange-600">smarter?</span></h2>
      <p>Join 12,000+ traders using OCTYRA. Start your free trial today</p>
      <button className="border bg-linear-to-br from-purple-700 to-orange-700 py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:scale-110 transform-fill">Get Started free <ArrowBigRightDash className="text-orange-500"/>
      </button>
      
    </div>
  )
}
