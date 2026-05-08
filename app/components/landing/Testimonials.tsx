import { Star } from "lucide-react";
import Image from "next/image";



export default function Testimonials() {
  const Stats = [
    { id: 1, label: "active Traders", value: "12,000+" },
    { id: 2, label: "win rate(30D)", value: "94%" },
    { id: 3, label: "profits generated", value: "$2.4M+" },
  ];

  const Avis = [
    {
      id: 1,
      emoji: "",
      image: "/avatar(1).jpg",
      label:
        "OCTYRA a complètement changé ma façon d’analyser le marché. Les signaux sont précis et l’interface est incroyablement fluide.",
      pseudo: "Francia M.",
      from: "📍 Paris, France",
      works: "💼Indepenent Trader",
    },
    {
      id: 2,
      image: "/avatar(2).jpg",
      label:
        "Une plateforme ultra intuitive. Même avec peu d’expérience, j’ai pu comprendre rapidement et prendre de meilleures décisions.",
      pseudo: "Saras K.",
      from: "📍 London, UK",
      works: "💼Beginner Trader",
    },
    {
      id: 3,
      image: "/avatar(3).jpg",
      label:
        "Les performances sont impressionnantes. OCTYRA détecte des opportunités que je n’aurais jamais vues seul.",
      pseudo: "💼Daniel R.",
      from: "📍 New York, USA",
      works: "Crypto Analyst",
    },
    {
      id: 4,
      image: "/avatar(4).jpg",
      label:
        "J’ai testé plusieurs outils, mais OCTYRA se démarque clairement. Rapide, fiable et très bien conçu.",
      pseudo: "Kenji T.",
      from: "📍 Tokyo, Japan",
      works: "💼Portfolio Manager",
    },
    {
      id: 5,
      image: "/avatar(5).jpg",
      label:
        "Un vrai gain de temps au quotidien. Les insights générés sont pertinents et faciles à exploiter.",
      pseudo: "Izak D.",
      from: "📍 Montréal, Canada",
      works: "💼Swing Trader",
    },
    {
      id: 6,
      image: "/avatar(6).jpg",
      label:
        "Le design est propre, moderne, et l’expérience utilisateur est au top. On sent un produit premium.",
      pseudo: "Ibrahim A.",
      from: "📍 Dubai, UAE",
      works: "Forex Trader",
    },
  ];

  return (
    <div className="flex px-10 md:justify-center py-20 items-center text-center md:px-40 flex-col  bg-gray-900/20 ">
      <section className="py-9 flex flex-col gap-3 items-start justify-start">
        <h1 className="tracking-wider uppercase text-sm border mx-3 border-orange-700 px-6 text-center font-lora font-heading rounded-2xl">
          Testimonials
        </h1>
        <h2 className="uppercase font-semibold tracking-wider">
          trust by real traders
        </h2>
      </section>
      <div className="bg-orange-400 w-14 h-1 rounded-2xl" />
      <section className="flex gap-4">
        {Stats.map((stat) => (
          <div
            key={stat.id}
            className="my-6  border border-orange-700/60 p-2 rounded-xl font-lora bg-orange-700/10"
          >
            <p className="tracking-wider scale-110 text-orange-500 font-bold">{stat.value}</p>
            <p className="uppercase text-sm font-extralight">{stat.label}</p>
          </div>
        ))}
      </section>
      <section className="px-12 grid grid-cols-1 md:grid-cols-3 md:px-auto gap-5 md:gap-10 p-3 mb-4 ">
        {Avis.map((avi) => (
          <div
            key={avi.id}
            className="flex flex-col border border-orange-400/50 bg-gray-500/10 rounded-md overflow-hidden hover:scale-105 transition-colors"
          >
            <div className="flex p-3 bg-gray-500/30">
            <Star className="text-orange-600 fill-orange-400 w-4 h-4" />
            <Star className="text-orange-600 fill-orange-400 w-4 h-4" />
            <Star className="text-orange-600 fill-orange-400 w-4 h-4" />
            <Star className="text-orange-600 fill-orange-400 w-4 h-4" />
            <Star className="text-orange-600 fill-orange-400 w-4 h-4" />
            </div>
            <div className="bg-orange-400 w-screen h-0.5 rounded-2xl mb-4" />
            <p className="mx-3 font-lora text-sm">{avi.label}</p>
            <div className="bg-orange-400 mx-18 my-4 w-20 md:mx-22 h-0.5 rounded-2xl mb-4" />
            <div className="flex gap-4  items-center">
                <div className="avatar bg-linear-to-br from-purple-700 to-orange-700 px-2 mx-1 ">
                    <Image
                    className="rounded-full m-2 border-2 border-orange-700"
                                src={avi.image}
                                alt="logo"
                                width={50}
                                height={50}
                                style={{ width: "50px", height: "50px"}}
                              />
                    
                </div>
                <div className="flex flex-col ">
                <p className="font-light">{avi.pseudo}</p>
                <p className="font-extralight text-sm">{avi.works}</p>
                </div>
                <div>
                    <p className="font-light">{avi.from}</p>
                </div>
            </div>
            

          </div>
        ))}
      </section>
    </div>
  );
}
