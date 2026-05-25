"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLead } from "@/context/LeadContext";
import { Button } from "./ui/Button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useLead();

  const WHATSAPP_URL = "https://wa.me/554198019902?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento.";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-primary/95 backdrop-blur-md py-3 shadow-xl" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center group focus-visible:outline-accent" aria-label="Garagem Comunicação Visual - Início">
          <Image 
            src="/images/logo_web.png" 
            alt="Garagem Comunicação Visual" 
            width={isScrolled ? 180 : 240} 
            height={80} 
            className="w-auto transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]"
            priority
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-10" aria-label="Navegação principal">
          <Link href="#portfolio" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors focus-visible:text-accent">
            Portfólio
          </Link>
          <Link href="#servicos" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors focus-visible:text-accent">
            Serviços
          </Link>
          <Link href="#contato" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors focus-visible:text-accent">
            Contato
          </Link>
          <Link href="#faq" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors focus-visible:text-accent">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button 
            size="sm"
            onClick={() => openModal(WHATSAPP_URL)}
            className="group rounded-full transition-[transform,background-color] motion-reduce:transition-none"
          >
            Orçamento Rápido
          </Button>
        </div>

        <button 
          className="md:hidden text-accent p-2 rounded-full focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <FaTimes className="w-8 h-8" aria-hidden="true" /> : <FaBars className="w-8 h-8" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary border-b-4 border-accent shadow-2xl flex flex-col p-8 gap-8 animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[80vh] overscroll-behavior-contain">
          <nav className="flex flex-col gap-6" aria-label="Navegação móvel">
            <Link 
              href="#portfolio" 
              className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-accent focus-visible:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfólio
            </Link>
            <Link 
              href="#servicos" 
              className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-accent focus-visible:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              href="#contato" 
              className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-accent focus-visible:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              href="#faq" 
              className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-accent focus-visible:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
          <Button 
            onClick={() => {
              openModal(WHATSAPP_URL);
              setIsMobileMenuOpen(false);
            }}
            size="lg"
            className="w-full transition-[transform,background-color] motion-reduce:transition-none"
          >
            Solicitar Orçamento
          </Button>
        </div>
      )}
    </header>
  );
}
