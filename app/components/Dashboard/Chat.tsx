"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { getToken } from "@/lib/auth";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis **ARIA**, votre assistante IA OCTYRA 📈\n\nJe peux vous aider avec :\n- Les concepts du trading\n- L'analyse technique (RSI, MACD, Bollinger...)\n- Les fonctionnalités d'OCTYRA\n- La gestion du risque\n\nQue souhaitez-vous apprendre ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const token = getToken();

      if (!token) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "❌ Vous n'êtes pas connecté. Veuillez vous reconnecter.",
          },
        ]);
        return;
      }

      const history = newMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(`${API_URL}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          history: history.slice(0, -1),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? "❌ Pas de réponse du serveur.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Erreur de connexion. Réessayez dans un instant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string | undefined) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  };

  const suggestions = [
    "C'est quoi le RSI ?",
    "Comment fonctionne OCTYRA ?",
    "Explique-moi le MACD",
    "Comment gérer mon risque ?",
    "Qu'est-ce que le DCA ?",
    "Scalping vs swing trading ?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 p-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Bot size={20} className="text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-black animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold font-lora text-white">ARIA</h2>
            <Sparkles size={13} className="text-orange-400" />
          </div>
          <p className="text-xs text-zinc-400">Assistante IA OCTYRA • Powered by Groq</p>
        </div>
        <div className="ml-auto text-xs text-zinc-500 font-lora">
          {messages.length - 1} message{messages.length > 2 ? "s" : ""}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === "assistant"
                ? "bg-gradient-to-br from-orange-500 to-orange-700 shadow-sm shadow-orange-500/40"
                : "bg-zinc-700 border border-white/10"
            }`}>
              {msg.role === "assistant"
                ? <Bot size={15} className="text-white" />
                : <User size={15} className="text-white" />
              }
            </div>
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-black/40 border border-white/10 text-zinc-100 rounded-tl-sm"
                  : "bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-tr-sm"
              }`}
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
              <Bot size={15} className="text-white" />
            </div>
            <div className="bg-black/40 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 my-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="text-xs px-3 py-2 rounded-full border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 mt-3 p-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Posez votre question sur le trading..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 resize-none focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          {loading
            ? <Loader2 size={16} className="text-white animate-spin" />
            : <Send size={16} className="text-white" />
          }
        </button>
      </div>
      <p className="text-center text-xs text-zinc-600 mt-2">
        Entrée pour envoyer • Shift+Entrée pour nouvelle ligne
      </p>
    </div>
  );
}