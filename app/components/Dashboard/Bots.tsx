"use client";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  CirclePlay,
  CirclePause,
  ClockFading,
  FolderCheck,
  PenLine,
  CircleStop,
  Play,
  BadgePlus,
  Bot,
} from "lucide-react";
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

interface Bot {
  id: number;
  name: string;
  asset: string;
  strategy: string;
  status: string;
  interval: string;
  email_alert: boolean;
  user_id: number;
  created_at: string;
}

interface BotCreate {
  name: string;
  asset: string;
  strategy: string;
  interval: string;
  email_alert: boolean;
}

interface BotUpdate {
  name?: string;
  asset?: string;
  strategy?: string;
  interval?: string;
  email_alert?: boolean;
  status?: string;
}

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [asset, setAsset] = useState("BTC");
  const [strategy, setStrategy] = useState("ensemble");
  const [interval, setInterval] = useState("5m");
  const [emailAlert, setEmailAlert] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editInterval, setEditInterval] = useState("");

  useEffect(() => {
    authFetch("/api/bots/")
      .then(setBots)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: BotCreate) => {
    const newBot = await authFetch("/api/bots/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setBots((prev) => [...prev, newBot]);
    setName("");
    setAsset("BTC");
    setStrategy("ensemble");
    setInterval("5m");
    setEmailAlert(false);
  };

  const updateBot = async (id: number, data: BotUpdate) => {
    const updated = await authFetch(`/api/bots/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setBots((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const deleteBot = async (id: number) => {
    await authFetch(`/api/bots/${id}`, { method: "DELETE" });
    setBots((prev) => prev.filter((b) => b.id !== id));
  };

  const startBot = async (id: number) => {
    const updated = await authFetch(`/api/bots/${id}/start`, { method: "POST" });
    setBots((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const stopBot = async (id: number) => {
    const updated = await authFetch(`/api/bots/${id}/stop`, { method: "POST" });
    setBots((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  if (loading) return <p className="flex items-center justify-center text-white">Chargement...</p>;

  return (
    <div className="md:w-full w-2xs max-w-2xl mx-auto flex flex-col p-4 rounded-2xl bg-linear-to-tr from-orange-600/30 via-purple-500/20 to-orange-600/30 border gap-3">

      {/* Bouton créer */}
      <section className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-lg cursor-pointer hover:bg-orange-600/90 bg-orange-600/70 flex gap-1 px-5 py-1">
              <BadgePlus />
              Create a bot
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm bg-linear-to-tr from-gray-300 via-olive-400/60 to-orange-300 flex justify-center flex-col px-20">
            <DialogHeader>
              <DialogTitle className="font-bold font-lora flex text-2xl justify-center">
                Create your Bot
              </DialogTitle>
              <DialogDescription className="text-black/40 flex justify-center font-bold">
                Make changes to your bot here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du bot"
                className="py-1.5 border border-black/30 rounded-2xl px-4"
              />
              <select
                className="py-1.5 border border-black/30 rounded-2xl px-4"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
              >
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="SOL">Solana</option>
                <option value="BNB">BNB</option>
                <option value="XRP">Ripple</option>
                <option value="DOGE">Dogecoin</option>
                <option value="OR">Or</option>
                <option value="PETROLE">Pétrole</option>
                <option value="EUR">EUR/USD</option>
                <option value="GBP">GBP/USD</option>
              </select>
              <select
                className="py-1.5 border border-black/30 rounded-2xl px-4"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
              >
                <option value="ensemble">Ensemble (RF + XGBoost)</option>
                <option value="rf">RandomForest uniquement</option>
                <option value="xgb">XGBoost uniquement</option>
              </select>
              <select
                className="py-1.5 border border-black/30 rounded-2xl px-4"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              >
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 heure</option>
              </select>
              <label className="flex gap-2 py-1.5 px-4">
                <input
                  type="checkbox"
                  checked={emailAlert}
                  onChange={(e) => setEmailAlert(e.target.checked)}
                />
                Recevoir les alertes par email
              </label>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <button
                className="px-4 text-white py-1.5 bg-linear-to-l from-orange-500/60 via-rose-600/50 to-black/60 rounded-2xl hover:scale-105 hover:font-bold tracking-widest text-lg font-lora"
                onClick={() => handleCreate({ name, asset, strategy, interval, email_alert: emailAlert })}
              >
                Créer le bot
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <h1 className="flex font-lora font-bold py-3 text-lg gap-2 justify-center underline underline-offset-8">
        <Bot className="fill-orange-500" /> Your <span className="text-orange-600">Bots</span>
      </h1>

      {/* Liste vide */}
      {bots.length === 0 && (
        <p className="text-center text-sm text-taupe-400 py-6">
          Aucun bot pour le moment. Créez-en un !
        </p>
      )}

      {/* Liste des bots */}
      {bots.map((bot) => (
        <section
          key={bot.id}
          className="flex flex-col gap-3 px-4 py-3 border-b border-t"
        >
          {/* Infos principales */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-bold text-white">{bot.name}</p>
              <p className="text-sm font-light">{bot.asset}</p>
            </div>
            <p className="text-sm">{bot.strategy}</p>
            <div className={`flex items-center gap-1 ${bot.status === "active" ? "text-green-500" : "text-red-500"}`}>
              {bot.status === "active" ? <CirclePlay size={16} /> : <CirclePause size={16} />}
              <p className="text-sm">{bot.status}</p>
            </div>
            <div className={`flex items-center gap-1 ${
              bot.interval === "5m" ? "text-green-500" :
              bot.interval === "15m" ? "text-red-500" : "text-blue-500 font-bold"
            }`}>
              <ClockFading size={16} />
              <p className="text-sm">{bot.interval}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2">

            {/* Éditer / Formulaire edit */}
            {editingId === bot.id ? (
              <div className="flex flex-col gap-2 w-full border p-3 rounded-xl bg-base-100">
                <h2 className="text-center font-lora capitalize text-sm">Upgrade your bot</h2>
                <input
                  className="border bg-white/70 text-black px-4 py-1.5 italic rounded-xl text-sm"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <select
                  className="border bg-white/70 text-black px-4 py-1.5 italic rounded-xl text-sm"
                  value={editInterval}
                  onChange={(e) => setEditInterval(e.target.value)}
                >
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 heure</option>
                </select>
                <div className="flex gap-2 justify-center">
                  <button
                    className="flex gap-1 bg-linear-to-br px-3 py-1 rounded-2xl from-orange-600/60 via-green-600/40 to-orange-600/60 text-sm"
                    onClick={() => { updateBot(bot.id, { name: editName, interval: editInterval }); setEditingId(null); }}
                  >
                    <FolderCheck className="fill-amber-500" size={16} />
                    Sauvegarder
                  </button>
                  <button
                    className="bg-red-500/50 px-3 py-1 rounded-2xl hover:scale-105 text-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex gap-1 hover:scale-110 text-sm"
                onClick={() => { setEditingId(bot.id); setEditName(bot.name); setEditInterval(bot.interval); }}
              >
                <PenLine size={16} />
                Éditer
              </button>
            )}

            {/* Start / Stop */}
            {bot.status === "active" ? (
              <button className="flex gap-1 hover:scale-105 text-sm" onClick={() => stopBot(bot.id)}>
                <CircleStop size={16} />
                Arrêter
              </button>
            ) : (
              <button className="flex gap-1 hover:scale-105 text-sm" onClick={() => startBot(bot.id)}>
                <Play size={16} />
                Démarrer
              </button>
            )}

            {/* Supprimer */}
            <button
              className="bg-red-500/40 hover:bg-red-500/60 px-3 py-1 rounded-3xl text-sm"
              onClick={() => deleteBot(bot.id)}
            >
              Supprimer
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}