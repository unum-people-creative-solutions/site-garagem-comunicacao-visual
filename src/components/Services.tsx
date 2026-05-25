"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup, FaTruck, FaPrint, FaFlag, FaImage, FaIdCard, FaStore, FaStickyNote } from "react-icons/fa";

const services = [
  {
    title: "Fachada em ACM",
    description: "Painel em ACM (Alumínio Composto) com acabamento premium. Ideal para um visual moderno e sofisticado.",
    icon: FaStore,
    image: "/images/fachada_acm.jpeg",
    details: ["Acabamento Premium", "Letra Caixa LED", "Alta Durabilidade"]
  },
  {
    title: "Fachada em Lona",
    description: "Fachadas personalizadas em lona de alta qualidade, resistente às intempéries e com cores vivas.",
    icon: FaLayerGroup,
    image: "/images/fachada_lona.png",
    details: ["Estrutura Metálica", "Impressão HD", "Custo-Benefício"]
  },
  {
    title: "Wind Banners",
    description: "Personalizados para eventos e pontos de venda. Disponível nos tamanhos P (1,50m), M (2,50m) e G (3,00m).",
    icon: FaFlag,
    image: "/images/windbanners.jpeg",
    details: ["Kit Completo com Base", "Tecido de Alta Durabilidade", "Vários Tamanhos"]
  },
  {
    title: "Cavaletes",
    description: "Cavaletes de alta visibilidade para calçadas. Personalização total com sua arte e marca.",
    icon: FaImage,
    image: "/images/cavaletes.jpeg",
    details: ["Estrutura Reforçada", "Personalização Total", "Fácil Mobilidade"]
  },
  {
    title: "Plotagem",
    description: "Transforme seu veículo em mídia ambulante com adesivos em brilho resistentes à água.",
    icon: FaTruck,
    image: "/images/plotagem.jpeg",
    details: ["Frotas e Carros Particulares", "Proteção de Pintura", "Adesivo Automotivo High-End"]
  },
  {
    title: "Banners",
    description: "Impressão em diversos tamanhos (0,50x0,70 | 0,70x1,00 | Custom). Acabamento em madeira e corda.",
    icon: FaPrint,
    image: "/images/banners.jpeg",
    details: ["Alta Resolução", "Fidelidade de Cores", "Acabamento Completo"]
  },
  {
    title: "Adesivos",
    description: "Adesivos personalizados em vinil e recortes especiais para decoração e sinalização.",
    icon: FaStickyNote,
    image: "/images/adesivos.jpeg",
    details: ["Vinil de Alta Qualidade", "Recorte Eletrônico", "Uso Interno e Externo"]
  },
  {
    title: "Impressos",
    description: "Cartões de visita e materiais institucionais para fechar negócios com profissionalismo.",
    icon: FaIdCard,
    image: "/images/papelaria.jpeg",
    details: ["Cartões de Visita (1000 un+)", "Folders e Panfletos", "Design Profissional"]
  }
];

export function Services() {
  const [activeService, setActiveService] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <section id="servicos" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone-yellow opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="label-yellow mb-4 md:mb-6">Nossas Especialidades</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-tight italic text-wrap-balance">
              Comunicação que <br />
              <span className="text-accent">gera resultados</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-accent" />
              <p className="text-slate text-sm md:text-lg font-bold uppercase tracking-tight">
                Dominamos as ruas com projetos que vendem por você.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveService(isActive ? null : index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative bg-[#0A0A0A] border rounded-card overflow-hidden transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-end
                  ${isActive ? "border-accent ring-1 ring-accent/20" : "border-white/10 hover:border-accent/50"}
                  ${isActive ? "min-h-[400px] md:min-h-[400px]" : "min-h-[140px] md:min-h-[400px] md:justify-end"}
                `}
              >
                {/* Service Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-all duration-700 ease-out
                      ${isActive ? "opacity-80 grayscale-0 scale-110" : "opacity-30 grayscale group-hover:opacity-60 group-hover:grayscale-0"}
                    `}
                    unoptimized
                  />
                  {/* Gradient Overlay - Lightened to show more image */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10 transition-opacity duration-500
                    ${isActive ? "opacity-100" : "opacity-80 md:opacity-100"}
                  `} />
                </div>

                <div className="relative z-20 p-6 md:p-10 transition-all duration-500">
                  <div className={`bg-accent rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border border-primary shadow-xl
                    ${isActive ? "w-12 h-12 md:w-16 md:h-16 mb-6 scale-110" : "w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-6"}
                  `}>
                    <service.icon className="w-5 h-5 md:w-8 md:h-8 text-primary stroke-accent stroke-[15px]" />
                  </div>
                  
                  <h3 className={`font-black uppercase tracking-tighter italic transition-all duration-500 leading-none
                    ${isActive ? "text-2xl md:text-3xl text-accent mb-4" : "text-xl md:text-3xl text-white mb-2 md:mb-4"}
                  `}>
                    {service.title}
                  </h3>
                  
                  <AnimatePresence>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: (isActive || isDesktop) ? "auto" : 0,
                        opacity: (isActive || isDesktop) ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm md:text-base text-zinc-100 mb-6 md:mb-8 leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {service.description}
                      </p>

                      <ul className="space-y-2 md:space-y-3 pb-2 md:pb-0">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Decorative corner element */}
                <div className={`absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-halftone transition-all duration-500 z-10 pointer-events-none
                  ${isActive ? "opacity-30" : "opacity-10 group-hover:opacity-20"}
                `} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
