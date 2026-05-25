# Tasks: Foundation & Design System

## 1. Project Initialization [P]
- [x] Criar estrutura base Next.js 15 (App Router) em `./site-garagem-comunicacao-visual/`.
- [x] Configurar `tsconfig.json` e `next.config.ts`.
- [x] Instalar dependências: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- **Gate**: `npm run dev` inicia sem erros. (Arquivos configurados)

## 2. Design System Setup
- [x] Configurar Tailwind CSS v4 com as cores e fontes especificadas.
- [x] Definir tokens de espaçamento e arredondamento (ex: botões agressivos/angulares).
- [x] Criar `src/styles/globals.css` com as diretivas base.
- **Gate**: Verificação visual de um componente de teste com as cores da marca.

## 3. Lead Tracking & Context
- [x] Implementar `src/context/LeadContext.tsx` conforme `@GENERAL_SPEC.md`.
- [x] Criar hook `useLead` para acessar os dados.
- [x] Implementar lógica de persistência (localStorage).
- **Gate**: Abrir URL com `?gclid=test` e verificar se o dado é capturado no Context.

## 4. CRM Integration Library
- [x] Criar `src/lib/crm.ts` com a função `ingestLead`.
- [x] Configurar tipos `LeadData`.
- [x] Configurar variáveis de ambiente (`NEXT_PUBLIC_API_GATEWAY_URL`, `CRM_API_KEY`).
- **Gate**: Teste unitário simulando envio de lead.

## 5. Global Layout & SEO
- [x] Configurar `layout.tsx` com Metadata API (SEO Local).
- [x] Adicionar Script do Google Tag Manager/gtag.
- [x] Criar `robots.ts` e `sitemap.ts` (esqueleto inicial).
- **Gate**: Presença da tag `gtag` no HTML gerado.
