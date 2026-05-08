"use client"
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";



export default function page() {
  return (
    <div className="bg-purple-900 flex flex-col items-center justify-center h-screen">

        <Link className="absolute top-4 left-4 text-white text-2xl hover:text-orange-500" href="/">
            <FaArrowLeft />
          </Link>
          
        <h1 className="text-4xl font-bold text-white">Octyra AI? We have that you need</h1>
    </div>
  )
}
