"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Orçamento Rápido",
    description: "Envie fotos e medidas via WhatsApp para uma pré-análise imediata."
  },
  {
    number: "02",
    title: "Visita Técnica",
    description: "Validamos os detalhes estruturais e medidas no local (Curitiba e região)."
  },
  {
    number: "03",
    title: "Design e Aprovação",
    description: "Nossa equipe cria o layout visual para sua validação final."
  },
  {
    number: "04",
    title: "Produção e Entrega",
    description: "Fabricação própria com materiais premium e instalação profissional."
  }
];

export function Workflow() {
  return (
    <section className="py-20 md:py-24 bg-[#050505] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-32 bg-accent/5 -rotate-6 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Como <span className="text-accent italic">Funcionamos</span>
          </h2>
          <p className="text-slate uppercase font-bold tracking-widest text-[10px] md:text-sm">
            Processo transparente do início ao fim
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 w-full h-[2px] bg-slate/10 z-0" />
              )}
              
              <div className="relative z-10">
                <span className="text-6xl md:text-7xl font-black text-white/5 italic tracking-tighter absolute -top-4 -left-2 md:-left-4 group-hover:text-accent/10 transition-colors">
                  {step.number}
                </span>
                
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent text-primary flex items-center justify-center font-black text-lg md:text-xl mb-4 md:mb-6 italic relative z-10 group-hover:bg-white transition-colors rounded-xl">
                  {step.number}
                </div>

                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-3 md:mb-4 italic">
                  {step.title}
                </h3>
                
                <p className="text-slate text-xs md:text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
