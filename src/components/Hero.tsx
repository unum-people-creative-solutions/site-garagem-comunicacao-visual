"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { useLead } from "@/context/LeadContext";
import { FaChevronRight } from "react-icons/fa";

const Spotlight = ({ position, delay = 0 }: { position: "left" | "right"; delay?: number }) => (
  <motion.div
    data-testid="hero-spotlight"
    initial={{ 
      rotate: position === "left" ? -30 : 30,
      opacity: 0,
    }}
    animate={{ 
      rotate: position === "left" ? [-30, -95, -30] : [30, 95, 30],
      opacity: [0.5, 0.9, 0.5],
    }}
    transition={{ 
      rotate: {
        duration: 12 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
      opacity: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }}
    style={{ 
      originX: position === "left" ? "left" : "right",
      originY: "bottom",
    }}
    className={`absolute -bottom-20 ${position === "left" ? "left-0" : "right-0"} w-[150vw] h-[300vh] pointer-events-none z-[1] mix-blend-screen`}
  >
    <div 
      style={{
        background: `conic-gradient(
          from ${position === "left" ? "80deg" : "-100deg"} 
          at ${position === "left" ? "0% 100%" : "100% 100%"}, 
          transparent 0deg, 
          rgba(255, 215, 0, 0.1) 4deg, 
          rgba(255, 255, 255, 0.8) 10deg, 
          rgba(255, 215, 0, 0.1) 16deg, 
          transparent 20deg
        )`,
        filter: "blur(30px)",
      }}
      className="w-full h-full"
    />
  </motion.div>
);

export function Hero() {
  const { openModal } = useLead();
  const whatsappUrl = "https://wa.me/554198019902?text=Ol%C3%A1%2C+vi+o+site+e+gostaria+de+solicitar+um+or%C3%A7amento+para+meu+neg%C3%B3cio.";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary pt-24 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/garagem_efeito.png" 
          alt="Background Garagem" 
          fill 
          className="object-cover opacity-40"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/80" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Skywalker Spotlights */}
      <Spotlight position="left" delay={2} />
      <Spotlight position="right" delay={5} />

      {/* Dynamic Ambient Glows */}
      <motion.div
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent opacity-5 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Background Texture/Effect */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-halftone opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-16 left-0 w-1/4 h-1/4 bg-halftone-yellow opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 z-10 text-center flex-grow flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12"
        >
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <span className="bg-accent text-primary px-5 md:px-8 py-2.5 md:py-3 font-black uppercase italic tracking-tighter text-sm md:text-lg rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] border-2 border-white/10 backdrop-blur-sm">
              Comunicação que vira o jogo!
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black uppercase leading-[0.9] md:leading-[0.85] tracking-[-0.05em] mb-8 md:mb-10 mx-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-wrap-balance"
          >
            Sua marca em <br />
            <motion.span 
              animate={{ color: ["#FFD700", "#FFF", "#FFD700"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent italic text-shadow-accent"
            >
              destaque.
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-white text-base md:text-2xl max-w-3xl mx-auto mb-10 md:mb-14 font-bold leading-tight uppercase tracking-tight text-wrap-pretty"
          >
            Transformamos <span className="text-accent">espaços comuns</span> em marcas que <span className="text-accent italic">chamam atenção!</span>
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mb-10"
          >
            <Button
              size="xl"
              className="w-full sm:w-auto gap-4 group text-lg md:text-xl py-5 md:py-6 px-8 md:px-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
              onClick={() => openModal(whatsappUrl)}
            >
              Quero Destacar Meu Negócio
              <FaChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </Button>
            
            <div className="text-left border-l-4 border-accent pl-4 hidden sm:block">
              <p className="text-sm font-black uppercase tracking-widest text-white italic">
                Sua marca em destaque. <br />
                Seu negócio na frente.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Diagonal Bottom Bar - FIXED POSITIONING */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-accent flex items-center justify-center overflow-hidden border-t-4 border-white z-20" role="marquee" aria-hidden="true">
        <div className="flex gap-10 animate-infinite-scroll whitespace-nowrap motion-reduce:animate-none font-variant-numeric-tabular-nums">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-primary font-black uppercase italic tracking-widest text-[10px] md:text-sm">
              Sua marca em destaque. Seu negócio na frente. • Fachadas • Envelopamento • Sinalização • 
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
