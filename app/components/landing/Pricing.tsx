"use client"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check,ArrowBigUpDash  } from "lucide-react";


const featureOne = [
  {
    title: "started",
    description: "For begginers exploring AI trading",
    label1: "1 trading bot",
    label2: "Basic AI signals",
    label3: "5 crypto pairs",
    label4: "Email alerts",
    label5: "Community access",
    action: "get started",
  },
];
const featureTwo = [
  {
    title: "Pro",
    description: "For serious traders who want an edge",
    label1: "5 trading bots",
    label2: "Advanced AI analysis",
    label3: "Unlimited crypto pairs",
    label4: "Real-time alerts",
    label5: "Priority support",
    label6: "Backtesting engine",
    action: "Start Trading Smarter🚀",
  },
];
const featureThree = [
  {
    title: "Elite",
    description: "Full power for professionals traders",
    label1: "unlimited bots",
    label2: "Custom AI stratégies",
    label3: "Multi-exchange support",
    label4: "API access",
    label5: "Dedicated manager",
    label6: "Live simulation",
    action: "Contact Sales",
  },
];

export default function Pricing() {
      const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-3 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,120,0,0.3)_0%,rgba(255,80,0,0.3)_25%,rgba(10,10,10,0.9)_40%,#000_100%)] -z-10" />
      <section className="p-15 font-lora flex flex-col">
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="font-bold text-2xl tracking-wider">
            Start winning with smarter trading🚀
          </h1>
          <p className="text-sm font-light">
            Trusted by 12,000+ traders wordwilde. No hidden fees. cancel
            anytime.
          </p>
          <div className="flex items-center gap-3 bg-black border border-orange-600/40 rounded-full px-5 py-2.5 w-fit">
      
      <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-orange-900"}`}>
        Monthly
      </span>

      <Switch
        checked={isYearly}
        onCheckedChange={setIsYearly}
        className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-900"
      />

      <span className={`text-sm font-medium ${isYearly ? "text-white" : "text-orange-900"}`}>
        Yearly{" "}
        {isYearly && (
          <span className="text-orange-400 font-semibold">(Save 30%)</span>
        )}
      </span>

    </div>
        </div>
      </section>

      <section className="flex flex-row md:flex-row items-center justify-center gap-5 mx-2">
        {featureOne.map((feature) => (
          <section
            key={feature.title}
            className=" w-50 border bg-black/60  rounded-2xl px-2 py-5"
          >
            <Card className="bg-transparent text-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold uppercase font-lora tracking-wide">
                  {feature.title}
                </CardTitle>
                <CardDescription className="my-2 text-white">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-baseline font-lora">
                  <span className="text-2xl">$0</span>
                  <span>/mo</span>
                </div>
              </CardContent>

              <Separator />
              <CardContent>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label1}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label2}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label3}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label4}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label5}</p>
                  </li>
                </ul>
              </CardContent>

              <Link href='/login'>
              <button className="border rounded-lg p-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full flex text-lg font-bold capitalize my-5">
                
                {feature.action}
                <ArrowBigUpDash />
              </button>
                </Link>
            </Card>
          </section>
        ))}

        {featureTwo.map((feature) => (
          <Card
            key={feature.title}
            className=" scale-105 relative  w-52 rounded-2xl border-3 border-orange-600 p-2 py-6 bg-black/60  overflow-visible shadow-[0_0_15px_2px_rgba(220,80,0,0.4),inset_0_0_20px_0px_rgba(180,60,0,0.1)]"
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2
    bg-orange-600 text-white
    text-xs font-semibold px-4 py-1
    rounded-full whitespace-nowrap"
            >
              <p className="text-sm tracking-widest uppercase">Most popular</p>
            </div>
            <CardHeader className="text-white">
                <CardTitle className="uppercase text-orange-600 text-xl tracking-wider font-lora ">
                    {feature.title}
                </CardTitle>
                <CardDescription className="text-white my-2">
                    {feature.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-baseline text-white items-baseline">
                    <span className="ml-4 font-lora tracking-widest text-2xl">$6</span>
                    <span className="text-lg pr-6">/mo</span>
                    <p className="line-through tracking-widest">$26</p>
                </div>
                <p className="border px-2 text-xs bg-orange-600 text-green-500 m-3 w-max py-1 rounded-lg scale-105 font-bold">
                    Best value - Save 30%
                </p>

            </CardContent>
            <CardContent>
                <ul>
                    <li className="flex gap-3 text-white ">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label1}</p>
                    </li>
                    <li className="flex gap-3 text-white">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label2}</p>
                    </li>
                    <li className="flex gap-3 text-white">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label3}</p>
                    </li>
                </ul>
                    <li className="flex gap-3 text-white">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label4}</p>
                    </li>
                    <li className="flex gap-3 text-white">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label5}</p>
                    </li>
                    <li className="flex gap-3 text-white">
                        <Check className="text-orange-500 "/>
                        <p>{feature.label6}</p>
                    </li>
            </CardContent>
            <Link href='/login'>
            <button className="border border-orange-600 p-2 rounded-sm text-white bg-orange-600 hover:text-black hover:bg-white transition-colors duration-300 w-full text-lg font-bold ">
                {feature.action}
            </button>
            </Link>
          </Card>
        ))}

        {featureThree.map((feature) => (
          <section
            key={feature.title}
            className=" w-50 border bg-black/60 rounded-2xl px-2 py-5"
          >
            <Card className="bg-transparent text-white ">
              <CardHeader>
                <CardTitle className="text-xl font-semibold uppercase font-lora tracking-wide">
                  {feature.title}
                </CardTitle>
                <CardDescription className="my-2 text-white">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-baseline font-lora">
                  <span className="text-2xl">$35</span>
                  <span>/mo</span>
                </div>
              </CardContent>

              <Separator />
              <CardContent>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label1}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label2}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label3}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label4}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label5}</p>
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-orange-500 " />
                    <p>{feature.label6}</p>
                  </li>
                </ul>
              </CardContent>
              <Link href='/login'>
              
              <button className="border flex rounded-lg py-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full text-lg font-bold capitalize my-5">
                {feature.action}
                <ArrowBigUpDash />
              </button>
              </Link>
            </Card>
          </section>
        ))}


      </section>
      <p className="mt-9 text-center">All plans include a 14-day free trial . No credi card required</p>
    </div>
  );
}
