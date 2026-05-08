"use client";
import { useState, useEffect } from "react";
import { getMe, getMyPlan, authFetch } from "@/lib/api";

import { CircleUser,Handshake, CircleFadingArrowUp   } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  plan_id: number;
  created_at: string;
  plan: {
    id: number;
    name: string;
    max_bots: number;
    email_alerts: boolean;
    api_access: boolean;
    backtesting: boolean;
    price: number;
  } | null;
}

interface Plan {
  plan: string;
  max_bots: number;
  email_alerts: boolean;
  api_access: boolean;
  backtesting: boolean;
  price: number;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    Promise.all([getMe(), getMyPlan()])
      .then(([userData, planData]) => {
        setUser(userData);
        setPlan(planData);
        setFullName(""); 
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ✅ handleUpdate est en dehors du return
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const updated = await authFetch("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({ full_name: fullName }),
      });
      setUser(updated);
      setMessage("Profil mis à jour ✅");
    } catch (err) {
      setMessage("Erreur lors de la mise à jour ❌");
    } finally {
      setUpdating(false);
      setLoading(true)
    }
  };

  if (loading)
    return <div className="flex w-fit items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-37.5" />
        <Skeleton className="h-4 w-25" />
      </div>
    </div>;
  if (!user)
    return <p className="text-center text-white py-10">Erreur de chargement</p>;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 py-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold font-lora">
          Mon <span className="text-orange-500">Profil</span>
        </h1>
        <p className="text-sm text-zinc-400">
          Gérez vos informations personnelles
        </p>
      </div>

      <section className="flex gap-3">
        <div className="w-1/2 flex flex-col gap-3 p-1.5 rounded-xl border border-white/10 bg-base-300/50">
          <CircleUser className="self-center w-16 h-16" />

          <div>
            <p className="font-lora font-bold text-zinc-400">
              User <span className="text-orange-500">Name :</span>
            </p>
            <p className="text-white border border-white/30 p-1 px-4 rounded-xl bg-base-200 capitalize font-medium">
              {user.full_name}
            </p>
          </div>

          <div>
            <p className="font-lora font-bold text-zinc-400">
              Email <span className="text-orange-500">Adress :</span>
            </p>
            <p className="text-white border border-white/30 p-1 px-4 rounded-xl bg-base-200 font-medium">
              {user.email}
            </p>
          </div>
          <div className="py-6 flex items-center justify-center ">
            <Dialog>
              <DialogTrigger asChild>
                <button className="border flex gap-1.5 border-orange-600 py-1 px-2 hover:bg-orange-600/30 rounded-xl">
                  <PencilLine className="hover:scale-110" />
                  Upgrade Name
                </button>
              </DialogTrigger>

              <DialogContent className="w-[60%] bg-linear-to-br from-orange-800/80 via-fuchsia-400/50 to-orange-500">
                <DialogHeader>
                  <DialogTitle className="px-3 font-bold tracking-wide  text-xl">
                    Need to updating your profile
                  </DialogTitle>
                  <DialogDescription className="font-bold text-black text-center text-sm">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>

                <section>
                  <div className="bg-white flex flex-col p-2 rounded-2xl">
                    <label className="text-xl font-lora text-zinc-900 font-bold ">
                      Update <span className="text-orange-500">Name</span>{" "}
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full font-lora text-white border border-white/30 p-1 px-4 rounded-xl bg-base-200 font-medium capitalize"
                      placeholder="Votre nom"
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <button className="font-bold bg-black/40 rounded-2xl px-4 py-1 cursor-pointer hover:bg-gray-800/50 transition-colors">
                        Cancel
                      </button>
                    </DialogClose>

                    <DialogClose asChild>
                      <button
                        onClick={handleUpdate}
                        disabled={updating}
                        className="mt-2 bg-orange-500/80 hover:bg-orange-500 text-white px-4 py-1.5 rounded-xl cursor-pointer  transition disabled:opacity-50"
                      >
                        {updating ? "Sauvegarde..." : "Sauvegarder"}
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </section>
              </DialogContent>
            </Dialog>
          </div>

          {message && (
            <p className="text-sm text-center text-zinc-300">{message}</p>
          )}
        </div>

        {plan && (
          <div className="w-1/2 flex flex-col gap-2 p-4 rounded-xl items-center border border-orange-500/30 bg-linear-to-br from-orange-500/40 via-transparent to-orange-500/40">
            
            <h1 className="text-lg flex gap-2 font-bold font-lora text-zinc-400"><Handshake /><span className="text-orange-500">Your</span> Plan</h1>
            <p className="w-full h-0.5 bg-white/40"/>

            <p className="text-gray-400 font-bold text-2xl">{plan.plan}</p>
            <div className="grid grid-cols-2 gap-x-9 gap-y-4 mt-2 text-sm">
              <p className="text-zinc-400">Max bots</p>
              <p className="text-white text-lg">{plan.max_bots}</p>
              <p className="text-zinc-400">Email alerts</p>
              <p className="text-white text-lg">{plan.email_alerts ? "✅" : "❌"}</p>
              <p className="text-zinc-400">API access</p>
              <p className="text-white text-lg">{plan.api_access ? "✅" : "❌"}</p>
              <p className="text-zinc-400">Backtesting</p>
              <p className="text-white text-lg">{plan.backtesting ? "✅" : "❌"}</p>
              <p className="text-zinc-400">Prix</p>
              <p className="text-white text-lg">${plan.price}/mois</p>
            </div>
          </div>
        )}
      </section>
      <div className="flex px-5 py-2 gap-5 flex-col justify-center items-center">
        <p className="font-lora ">Need to upgrade your plan? Use the perfect skills with <span className="text-orange-500 text-lg font-bold ">Octyra</span></p>
        <Link href='/dashboard/plan'>
        <button className="border flex px-4 py-1 gap-1.5 hover:scale-105 rounded-lg ">RUN TO UP <CircleFadingArrowUp /></button>
        </Link>
      </div>
    </div>
  );
}
