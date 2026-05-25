"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "A Garagem desenvolve a arte visual ou preciso enviar pronta?",
    answer: "Nós temos equipe de design interna para criar o layout do seu projeto. Se você já tiver a arte, aceitamos arquivos em PDF, CorelDRAW ou Illustrator para garantir a máxima qualidade."
  },
  {
    question: "Como funciona a solicitação de orçamento?",
    answer: "É simples e rápido. Você entra em contato pelo WhatsApp, envia fotos do local e as medidas aproximadas. Com isso, geramos uma estimativa. Para projetos complexos, agendamos uma visita técnica."
  },
  {
    question: "Qual é o tempo médio de produção e instalação?",
    answer: "Materiais rápidos como banners e adesivos levam de 2 a 5 dias úteis. Projetos maiores, como fachadas em ACM, levam em média de 10 a 20 dias úteis, dependendo da complexidade."
  },
  {
    question: "Qual é a garantia dos materiais?",
    answer: "Oferecemos garantia contra desbotamento e defeitos de instalação. Geralmente, lonas têm garantia de 6 a 12 meses, enquanto estruturas de ACM podem durar de 2 a 5 anos."
  },
  {
    question: "Vocês atendem fora de Colombo?",
    answer: "Sim! Atendemos Curitiba e toda a Região Metropolitana. Temos infraestrutura para instalações em altura e grandes formatos em qualquer local da região."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Trabalhamos com entrada de 50% para início da produção e 50% na finalização. Aceitamos PIX, cartões de crédito (com parcelamento) e faturamento para empresas."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 bg-primary relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
            Dúvidas <span className="text-accent italic">Frequentes</span>
          </h2>
          <p className="text-slate uppercase font-bold tracking-widest text-[10px] md:text-sm">
            Tudo o que você precisa saber para começar
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border transition-colors rounded-xl md:rounded-2xl overflow-hidden ${isOpen ? "border-accent bg-accent/5" : "border-white/10 bg-[#0A0A0A]"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 md:p-6 flex justify-between items-center text-left group"
                >
                  <span className={`text-sm md:text-lg font-black uppercase tracking-tighter italic transition-colors ${isOpen ? "text-accent" : "text-white group-hover:text-accent"}`}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <FaMinus className="w-3 h-3 md:w-4 md:h-4 text-accent flex-shrink-0" />
                  ) : (
                    <FaPlus className="w-3 h-3 md:w-4 md:h-4 text-slate group-hover:text-accent flex-shrink-0" />
                  )}

                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 md:p-6 pt-0 text-slate text-xs md:text-sm font-medium leading-relaxed border-t border-slate/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
