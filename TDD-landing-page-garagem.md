# Technical Design Document (TDD): Landing Page - Garagem Comunicação Visual

## 1. Background & Motivation
A Garagem Comunicação Visual atende microempreendedores de Curitiba e região (DDD 41). O objetivo principal é gerar leads qualificados via WhatsApp. O cliente que busca a Garagem tem uma dor clara: **quer ser visto e reconhecido profissionalmente**. O site atual (ou a falta dele) não reflete a capacidade da empresa de transformar espaços comuns em marcas de destaque. A nova Landing Page deve ser uma prova viva dessa capacidade: altamente visual, dinâmica e focada em conversão.

## 2. Documentos de Referência (Source of Truth)
Para a implementação, utilize os arquivos abaixo como base fundamental:
*   **`identidade_visual_garagem.md`**: Detalha a paleta de cores (Preto/Amarelo), tipografia *script/brush* e elementos gráficos (halftone, diagonais).
*   **`CONTEUDO-ESTRATEGICO-GARAGEM.md`**: Contém todo o copy da página, descrição dos serviços, fluxo de orçamento e a seção de FAQ (Perguntas e Respostas).

## 3. Scope & Impact
*   **Público-Alvo:** Micro e pequenos empreendedores locais (comércio de rua, prestadores de serviço) em Curitiba e Região Metropolitana.
*   **Ação Desejada (Macro-Conversão):** Clique no botão do WhatsApp solicitando um orçamento ou visita técnica. Link: `https://wa.me/5541992675409`.
*   **Impacto Visual:** O site deve transmitir imediatamente autoridade, profissionalismo e dinamismo, utilizando a abordagem "A Transformação Visual".

## 4. Proposed Solution

### 4.1. Design Direction (Frontend Blueprint)
*   **Mood:** Dinâmico, Impactante, Transformador, Urbano-Profissional.
*   **Paleta de Cores:**
    *   `Primary (Contraste/Base)`: Preto Absoluto (`#0A0A0A`).
    *   `Accent (Conversão/Atenção)`: Amarelo Sinalização (`#FFD700`).
    *   `Neutrals (Respiro/Texto)`: Branco (`#FFFFFF`) e Cinza Slate (`#94A3B8`).
*   **Tipografia:**
    *   `Headings`: Fonte Sans-Serif geométrica/blocada, caixa alta, peso Black/ExtraBold, com inclinação (itálico) em palavras-chave.
    *   `Body`: Fonte Sans-Serif limpa (ex: *Inter*).
*   **Layout & Componentes Dinâmicos:**
    *   Hero section com forte contraste.
    *   Uso de texturas de *halftone* sutis ao fundo.
    *   **Componente Crítico:** Slider interativo de "Antes/Depois" para provar a transformação visual.
    *   Linhas diagonais e recortes angulares nas divisões de seção.
*   **Iconografia:** Vetorial, linear, espessa e com recortes agressivos.

### 4.2. Positioning & Copywriting Architecture (Refined)
Consulte o arquivo `CONTEUDO-ESTRATEGICO-GARAGEM.md` para o texto integral.
*   **Wedge (O Diferencial):** Transformação radical de fachadas gastas em ímãs de clientes em poucos dias.
*   **Proof Vector:** Galeria de Antes/Depois de comércios locais.
*   **Tier 1 Narrative (Hero):** "Sua marca em destaque. Seu negócio na frente."
*   **Tom de Voz:** Direto, voltado para resultados, focado no microempreendedor de Curitiba.

### 4.3. Technical Architecture
*   **Framework:** React / Next.js (SSG para performance e SEO local).
*   **Estilização:** Tailwind CSS (versão 4/Oxide) - foco em utilitários de `clip-path` para diagonais.
*   **Animações:** Framer Motion (para o slider de Antes/Depois e entrada de elementos).
*   **Ícones:** Lucide React.

## 5. Implementation Plan (Phased)

*   **Step 1: Setup & Design Tokens:** Configuração do Tailwind com a paleta Preto/Amarelo e fontes.
*   **Step 2: Hero Section:** Título de alto impacto e CTA primário para o WhatsApp.
*   **Step 3: Slider "A Transformação":** Componente interativo (Antes/Depois) usando Framer Motion.
*   **Step 4: Grade de Serviços:** Fachadas (ACM/Lona), Envelopamento, Banners e Sinalização.
*   **Step 5: Seção de FAQ:** Integração das 6 perguntas e respostas mapeadas no arquivo de conteúdo.
*   **Step 6: Footer & Conversão Final:** Link direto para WhatsApp e endereço em Colombo-PR.

## 6. Verification
*   **Responsividade:** Perfeito em dispositivos móveis (foco no empreendedor que acessa via celular).
*   **SEO Local:** Presença de termos como "Curitiba", "Colombo" e "Região Metropolitana".
*   **Conversão:** Todos os CTAs funcionais direcionando para o WhatsApp (41) 99267-5409 com mensagem pré-definida.
