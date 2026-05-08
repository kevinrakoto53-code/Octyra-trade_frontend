"use client";
import { useState } from "react";
import Image from "next/image";

const profil = [
  { id: 1, label: "Avatar 1", src: "/bg/bg(2).jpg" },
  { id: 2, label: "Avatar 2", src: "/bg/bg(3).jpg" },
  { id: 3, label: "Avatar 3", src: "/bg/bg(4).jpg" },
  { id: 4, label: "Avatar 4", src: "/bg/bg(5).jpg" },
  { id: 5, label: "Avatar 5", src: "/bg/bg(6).jpg" },
  { id: 6, label: "Avatar 6", src: "/bg/bg(7).jpg" },
];

export default function AvatarPicker() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  // ↑ null côté serveur → pas d'image rendue → pas de mismatch

  // s'exécute uniquement côté client
  useState(() => {
    const saved = localStorage.getItem("octyra-avatar") ?? profil[0].src
    setSelectedAvatar(saved)
  })

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvatar(e.target.value)
    localStorage.setItem("octyra-avatar", e.target.value)
  }

  // ne rend rien tant qu'on est côté serveur
  if (!selectedAvatar) return null

  return (
    <div className="flex px-2 border w-80 h-40">
      <section className="flex flex-col w-28 h-28 gap-4">
        <div className="w-28 p-1">
          <Image
            src={selectedAvatar}
            alt="avatar"
            width={112}
            height={112}
            priority
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <select
          value={selectedAvatar}
          onChange={handleSelect}
          className="bg-zinc-900 text-white border border-zinc-700 rounded-lg text-sm"
        >
          {profil.map((avatar) => (
            <option key={avatar.id} value={avatar.src}>
              {avatar.label}
            </option>
          ))}
        </select>
      </section>
    </div>
  )
}