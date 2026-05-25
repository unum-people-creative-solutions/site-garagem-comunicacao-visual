"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLead } from "@/context/LeadContext";

export function WhatsAppFloatingButton() {
  const { openModal } = useLead();
  const whatsappUrl = "https://wa.me/554198019902?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento.";

  return (
    <button
      onClick={() => openModal(whatsappUrl)}
      className="fixed bottom-6 right-6 z-40 bg-accent text-primary p-4 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-110 active:scale-95 transition-all group border-2 border-primary"
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 text-primary stroke-accent stroke-[20px]" />
      <span className="absolute right-full mr-4 bg-primary text-white border border-white/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl translate-x-4 group-hover:translate-x-0 italic">
        O jogo vira agora!
      </span>
    </button>
  );
}
