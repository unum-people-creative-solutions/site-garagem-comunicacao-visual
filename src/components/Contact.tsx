"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useLead } from "@/context/LeadContext";

const contactMethods = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    value: "41 9801-9902",
    label: "Orçamento Imediato",
    action: "Entrar em contato",
    icon: FaWhatsapp,
    link: "https://wa.me/554198019902?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento.",
    color: "bg-[#25D366]",
    size: "col-span-2 md:col-span-1"
  },
  {
    id: "address",
    title: "Endereço",
    value: "Colombo - PR",
    label: "Curitiba e Região",
    action: "Acessar Local",
    icon: FaMapMarkerAlt,
    link: "https://maps.app.goo.gl/YVTR8dJjEFtqqW9GA",
    color: "bg-accent",
    size: "col-span-2 md:col-span-1"
  },
  {
    id: "instagram",
    title: "Instagram",
    value: "@garagemcomunicacaovisuall",
    label: "Siga nosso portfólio",
    action: "Acessar Rede",
    icon: FaInstagram,
    link: "https://instagram.com/garagemcomunicacaovisuall",
    color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    size: "col-span-2"
  }
];

export function Contact() {
  const { openModal } = useLead();

  return (
    <section id="contato" className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Visual background elements matching Hero */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="label-yellow mb-4 md:mb-6">Pronto para começar?</span>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic leading-[0.9] md:leading-[0.85] text-wrap-balance">
              Sua marca no <br />
              <span className="text-accent">próximo nível.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const isWhatsapp = method.id === "whatsapp";
            
            return (
              <motion.a
                key={method.id}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (isWhatsapp) {
                    e.preventDefault();
                    openModal(method.link);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative ${method.size} p-6 md:p-12 rounded-card border border-white/10 bg-[#0A0A0A] overflow-hidden transition-all duration-500 hover:border-accent active:border-accent hover:shadow-[0_0_40px_rgba(255,215,0,0.1)] active:shadow-[0_0_40px_rgba(255,215,0,0.1)] cursor-pointer`}
              >
                {/* Glowing hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent text-primary flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-active:scale-110 transition-transform duration-500 shadow-xl border border-primary">
                      <method.icon className="w-5 h-5 md:w-8 md:h-8 text-primary stroke-accent stroke-[15px]" />
                    </div>
                    
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-accent mb-1 md:mb-2 italic">
                      {method.title}
                    </h3>
                    
                    <p className="text-xl md:text-4xl font-black uppercase tracking-tighter italic text-white mb-2 md:mb-4 leading-none">
                      {method.value}
                    </p>
                    
                    <p className="text-slate text-[10px] md:text-sm font-bold uppercase tracking-widest">
                      {method.label}
                    </p>
                  </div>

                  <div className="mt-8 md:mt-12 flex items-center gap-2 md:gap-3 text-white group-hover:text-accent group-active:text-accent transition-colors">
                    <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] italic">{method.action}</span>
                    <FaArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-2 group-active:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Decorative graphic element */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-white/5 group-hover:text-accent/5 group-active:text-accent/5 transition-colors duration-500">
                  <method.icon className="w-24 h-24 md:w-48 md:h-48 rotate-[-15deg]" />
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-slate font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] italic">
            Curitiba e Região Metropolitana
          </p>
        </motion.div>
      </div>
    </section>
  );
}
