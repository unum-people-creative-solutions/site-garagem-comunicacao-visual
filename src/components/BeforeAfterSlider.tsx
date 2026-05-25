"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const portfolioCases = [
  {
    id: "bikeshop",
    title: "Fachada Bike Shop",
    before: "/images/bikeshop_antes.png",
    after: "/images/bikeshop_depois.png",
    description: "Transformação total de fachada com ACM e iluminação LED."
  },
  {
    id: "oficina",
    title: "Fachada Oficina",
    before: "/images/oficina_antes.png",
    after: "/images/oficina_depois.png",
    description: "Revitalização de identidade visual e sinalização externa."
  },
  {
    id: "saveiro",
    title: "Plotagem Saveiro",
    before: "/images/saveiro_antes.png",
    after: "/images/saveiro_depois.png",
    description: "Envelopamento comercial estratégico para frotas."
  }
];

export function BeforeAfterSlider() {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  const onMouseDown = () => {
    window.addEventListener("mousemove", handleMove);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mouseup", onMouseUp);
  };

  const onTouchStart = () => {
    window.addEventListener("touchmove", handleMove);
    const onTouchEnd = () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
    window.addEventListener("touchend", onTouchEnd);
  };

  const nextCase = () => setActiveCase((prev) => (prev + 1) % portfolioCases.length);
  const prevCase = () => setActiveCase((prev) => (prev - 1 + portfolioCases.length) % portfolioCases.length);

  return (
    <section id="portfolio" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-halftone opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              A <span className="text-accent italic">Transformação</span> Visual
            </h2>
            <div className="inline-block border-2 border-accent p-1">
              <p className="bg-accent text-primary uppercase font-black tracking-widest text-[10px] md:text-xs px-4 py-1 italic">
                Arraste para ver a diferença radical
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={prevCase}
              className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all rounded-full group cursor-pointer"
              aria-label="Caso anterior"
            >
              <FaChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextCase}
              className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all rounded-full group cursor-pointer"
              aria-label="Próximo caso"
            >
              <FaChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[16/9] md:aspect-[21/9] cursor-ew-resize select-none border-4 md:border-8 border-[#111] shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden rounded-card"
            >
              <div 
                ref={containerRef}
                className="absolute inset-0"
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
              >
                {/* After Image (Background) */}
                <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center">
                  <Image 
                    src={portfolioCases[activeCase].after} 
                    alt={`${portfolioCases[activeCase].title} após transformação profissional`}
                    fill 
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20">
                    <span className="bg-accent text-primary text-sm md:text-2xl font-black px-4 md:px-6 py-1 md:py-2 shadow-xl rounded-full italic uppercase">DEPOIS</span>
                  </div>
                </div>

                {/* Before Image (Foreground with Clip Path) */}
                <div 
                  className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center grayscale"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  aria-hidden="true"
                >
                  <Image 
                    src={portfolioCases[activeCase].before} 
                    alt={`${portfolioCases[activeCase].title} antes da transformação`}
                    fill 
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover brightness-50 md:brightness-75"
                    unoptimized
                  />
                  <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20">
                    <span className="bg-white text-primary text-sm md:text-2xl font-black px-4 md:px-6 py-1 md:py-2 shadow-xl rounded-full italic uppercase">ANTES</span>
                  </div>
                </div>

                {/* Slider Line/Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 md:w-1.5 bg-accent z-30 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-accent text-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)] border-2 md:border-4 border-primary">
                    <div className="flex gap-0.5 md:gap-1" aria-hidden="true">
                      <div className="w-0.5 md:w-1 h-3 md:h-4 bg-primary/40" />
                      <div className="w-0.5 md:w-1 h-3 md:h-4 bg-primary/40" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">
              {portfolioCases[activeCase].title}
            </h3>
            <p className="text-slate font-bold uppercase tracking-widest text-xs md:text-sm">
              {portfolioCases[activeCase].description}
            </p>
          </div>
          
          <div className="flex gap-2">
            {portfolioCases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`w-12 h-1.5 rounded-full transition-all cursor-pointer ${idx === activeCase ? "bg-accent w-20" : "bg-white/10 hover:bg-white/20"}`}
                aria-label={`Ver caso ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-slate font-medium text-lg italic text-wrap-pretty mt-8">
            “Nós não apenas instalamos placas. Nós criamos ímãs de clientes através do contraste e profissionalismo visual.”
          </p>
        </div>
      </div>
    </section>
  );
}
