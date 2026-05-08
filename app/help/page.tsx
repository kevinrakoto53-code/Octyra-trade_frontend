"use client"
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function page() {
  return (
    <div className="flex w-screen h-screen items-center justify-center  bg-orange-500/10 text-white font-lora text-2xl">
      You need Help? Contact us at <a href="mailto:kevinrakoto53@gmail.com" className="text-orange-400 hover:underline">
        kevinrakoto53@gmail.com
      </a>

      <Link className="absolute top-4 left-4 text-white text-2xl hover:text-orange-500" href="/">
            <FaArrowLeft />
          </Link>
    </div>
  )
}
