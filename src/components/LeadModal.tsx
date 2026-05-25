"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IMaskInput } from "react-imask";
import { useLead } from "@/context/LeadContext";
import { sendLeadToCRM, LeadData } from "@/lib/crm";
import { FaUser, FaWhatsapp, FaEnvelope, FaTimes, FaExclamationCircle, FaPaperPlane } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "./ui/Button";

const leadSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().min(14, "Telefone incompleto"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadModal() {
  const { isOpen, closeModal, whatsappUrl, tracking } = useLead();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: LeadFormValues) => {
    setIsLoading(true);

    let origem = "Orgânico";
    if (tracking.gclid) {
      origem = "Google Ads";
    } else if (tracking.utm_source === "facebook" || tracking.utm_source === "instagram" || tracking.fbclid) {
      origem = "Social Ads";
    } else if (tracking.utm_source) {
      origem = tracking.utm_source;
    }

    const leadData: LeadData = {
      ...data,
      ...tracking,
      origem: origem,
      metadados: {
        url_conversao: whatsappUrl,
        data_hora: new Date().toISOString(),
        hostname: window.location.hostname,
      },
    };

    try {
      try {
        await sendLeadToCRM(leadData);
      } catch (crmError) {
        console.error("Erro ao enviar para o CRM:", crmError);
      }

      // Google Ads Conversion tracking would go here
    } catch (error) {
      console.error("Falha ao processar lead:", error);
    } finally {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="bg-primary w-full max-w-md border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden">
        <div className="bg-accent p-8 flex justify-between items-center text-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-halftone opacity-20" />
          <div className="relative z-10">
            <h3 className="font-black uppercase text-3xl italic tracking-tighter leading-none">
              Destaque <br /> sua Marca
            </h3>
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mt-2 italic">
              O jogo vira agora!
            </p>
          </div>
          <button 
            onClick={closeModal}
            className="p-3 hover:bg-black/10 transition-colors relative z-10 rounded-full focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Fechar modal"
          >
            <FaTimes className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 flex flex-col gap-8 bg-halftone-yellow bg-opacity-5" noValidate>
          <div className="space-y-4" aria-live="polite">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-2 block" htmlFor="nome">
                Seu Nome
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
                <input
                  {...register("nome")}
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="COMO DEVEMOS TE CHAMAR?"
                  className={`w-full bg-black/50 border ${errors.nome ? 'border-red-500' : 'border-white/10'} py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-colors text-white rounded-full focus-visible:ring-2 focus-visible:ring-accent`}
                />
              </div>
              {errors.nome && (
                <p className="text-[10px] text-red-500 font-bold mt-2 flex items-center gap-1 ml-4" role="alert">
                  <FaExclamationCircle className="w-3 h-3" /> {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-2 block" htmlFor="telefone">
                WhatsApp
              </label>
              <div className="relative">
                <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      id="telefone"
                      mask="(00) 00000-0000"
                      lazy={true}
                      value={field.value}
                      unmask={false}
                      onAccept={(value) => field.onChange(value)}
                      placeholder="(00) 00000-0000"
                      autoComplete="tel"
                      inputMode="tel"
                      className={`w-full bg-black/50 border ${errors.telefone ? 'border-red-500' : 'border-white/10'} py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-colors text-white rounded-full focus-visible:ring-2 focus-visible:ring-accent`}
                    />
                  )}
                />
              </div>
              {errors.telefone && (
                <p className="text-[10px] text-red-500 font-bold mt-2 flex items-center gap-1 ml-4" role="alert">
                  <FaExclamationCircle className="w-3 h-3" /> {errors.telefone.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-2 block" htmlFor="email">
                E-mail (Opcional)
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="SEU@EMAIL.COM"
                  className={`w-full bg-black/50 border border-white/10 py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-colors text-white rounded-full focus-visible:ring-2 focus-visible:ring-accent`}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full gap-3 transition-[transform,background-color] motion-reduce:transition-none"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Quero meu orçamento
                <FaPaperPlane className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </Button>
          
          <p className="text-[9px] text-center text-slate font-bold uppercase tracking-tighter leading-tight opacity-50">
            Faremos contato o mais breve possível. <br />
            Seus dados estão protegidos.
          </p>
        </form>
      </div>
    </div>
  );
}
