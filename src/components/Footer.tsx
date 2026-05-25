"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLead } from "@/context/LeadContext";

export function Footer() {
  const { openModal } = useLead();
  const whatsappPrincipal = "https://wa.me/554198019902?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento.";
  const whatsappSecundario = "https://wa.me/5541992675409?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento.";

  return (
    <footer className="bg-primary pt-20 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="group focus-visible:outline-accent" aria-label="Garagem Comunicação Visual - Início">
              <Image 
                src="/images/logo_web.png" 
                alt="Garagem Comunicação Visual" 
                width={180} 
                height={57} 
                className="w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </Link>
            <p className="text-slate text-[10px] font-black uppercase tracking-[0.3em] italic text-center md:text-left leading-relaxed">
              Sua marca em <span className="text-accent">destaque.</span> <br />
              Seu negócio na <span className="text-accent">frente.</span>
            </p>
          </div>

          {/* Contact Links Group */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <h4 className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] italic">Atendimento WhatsApp</h4>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => openModal(whatsappPrincipal)}
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all group cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5 text-accent" />
                <span className="text-sm font-black italic tracking-tighter tabular-nums">(41) 9801-9902</span>
              </button>
              <button 
                onClick={() => openModal(whatsappSecundario)}
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all group cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                <span className="text-sm font-black italic tracking-tighter tabular-nums">(41) 99267-5409</span>
              </button>
            </div>
          </div>

          {/* Social Links Group */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <h4 className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] italic">Siga nosso Trabalho</h4>
            <div className="flex flex-col gap-4">
              <a href="https://www.instagram.com/garagemcomunicacaovisuall" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-accent transition-all group">
                <FaInstagram className="w-5 h-5 text-accent" />
                <span className="text-sm font-black italic tracking-tighter">@garagemcomunicacaovisuall</span>
              </a>
              <a href="https://instagram.com/garagemcomunicacaovisual" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-accent transition-all group">
                <FaInstagram className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                <span className="text-sm font-black italic tracking-tighter">@garagemcomunicacaovisual</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] text-center">
            © {new Date().getFullYear()} Garagem Comunicação Visual. Todos os direitos reservados.
          </p>
          
          <a 
            href="https://unumpeople.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 transition-all group"
          >
            <span className="text-[9px] uppercase tracking-[0.1em] font-bold text-white/10 group-hover:text-white/30">
              Desenvolvido por
            </span>
            <span className="text-[10px] font-bold text-white/10 group-hover:text-accent transition-all tracking-tight uppercase">
              Unum People Creative Solutions
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
