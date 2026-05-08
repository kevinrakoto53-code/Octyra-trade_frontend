"use client";
import { Bot, ChartNoAxesColumnIncreasing, ListPlus, Zap } from "lucide-react";

const Information = [
      {
    name: "Bot Name",
    value: "3",
    icon: Bot,
    indication: "+P&L",
    colors: "text-orange-700",
    background:"bg-linear-to-r from-transparent via-orange-700/50 to-transparent border border-white/10 backdrop-blur-2xl p-1 rounded-xl"
  },
    {
    name: "Trades",
    value: "13",
    icon: Zap,
    indication: "+1,320",
    colors: "text-yellow-500",
    background:"bg-linear-to-l from-transparent via-green-700/50 to-transparent border border-white/10 backdrop-blur-2xl p-1 rounded-xl"
  },
    {
    name: "Signaux",
    value: "4",
    icon: ChartNoAxesColumnIncreasing,
    indication: "+51%",
    colors: "text-green-700",
    background:"bg-linear-to-l from-transparent via-yellow-700/50 to-transparent border border-white/10 backdrop-blur-2xl p-1 rounded-xl"
  },
   {
    name: "news",
    value: "4",
    icon: ListPlus,
    indication: "+51%",
    colors: "text-blue-700",
    background:"bg-linear-to-l from-transparent via-blue-700/50 to-transparent border border-white/10 backdrop-blur-2xl p-1 rounded-xl"
  },
];

export default function Info() {
  return (
    <div className="grid grid-cols-2 gap-3 md:flex md:justify-around font-lora md:gap-10">
      {Information.map((info) => {
        const Icon = info.icon;

        return (
            <section key={info.name}>
          <div className="flex flex-col p-2  bg-base-100/70 rounded-2xl border w-40">
            <div className="flex flex-col ">
            <div className="flex justify-between ">
              <div className="flex gap-3 flex-col ">
                <h2 className="">{info.name}</h2>
                <p>{info.value}</p>
              </div>
              <Icon className={info.colors} />
            </div> 
            <button className={info.background}>{info.indication}</button>
            </div>
          </div>
            </section>
        );
      })}
    </div>
  );
}
