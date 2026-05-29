# Performance Optimizations Specification

## Problem Statement

O site apresenta travamentos em dispositivos com hardware mais modesto devido a animações pesadas contínuas geradas via JavaScript (Framer Motion) e efeitos CSS custosos (blurs e gradients). Além disso, o componente BeforeAfterSlider apresenta problemas de "scroll-jank" ao ser manipulado em dispositivos móveis.

## Goals

- [x] Otimizar a performance de animações contínuas aliviando a CPU (migração para GPU/CSS).
- [x] Implementar sistema de degradação suave (3 níveis) para desativar efeitos em hardwares modestos.
- [x] Resolver travamento de scroll no slider de antes e depois.

## Out of Scope

| Feature     | Reason         |
| ----------- | -------------- |
| Otimização de Imagens | Não é a causa raiz dos engasgos e demanda refatoração na pipeline de build. Focado na GPU/CPU. |
| Alteração Visual de Design | A aparência visual deve permanecer exatamente a mesma no Tier 3. |

---

## User Stories

### P1: Sistema de Degradação Suave (3 Tiers) ⭐ MVP

**User Story**: Como um usuário com um dispositivo modesto, quero navegar sem travamentos, mesmo que signifique perder efeitos visuais complexos.

**Why P1**: Evita abandono da página por lentidão extrema.

**Acceptance Criteria**:
1. WHEN carregado em um dispositivo com baixa memória ou `prefers-reduced-motion` ativo THEN o hook `usePerformanceTier` SHALL retornar Tier 1 ou 2.
2. WHEN no Tier 1 THEN animações pesadas do Spotlight e Glows SHALL NÃO ser renderizadas.
3. WHEN no Tier 2 THEN os gradientes/blurs são mantidos, mas as animações (rotação, translação) SHALL ser paradas.

**Independent Test**: Pode ser verificado injetando propriedades simuladas (`navigator.deviceMemory`) ou ativando a preferência de movimento reduzido do SO.

---

### P1: Migração Framer Motion para CSS (Aceleração GPU) ⭐ MVP

**User Story**: Como um usuário geral, quero que as animações rodem a 60fps sem drenar a bateria ou congelar o navegador.

**Why P1**: Reduz drásticamente o overhead da thread principal (CPU) transferindo trabalho para a placa de vídeo.

**Acceptance Criteria**:
1. WHEN o componente Hero é renderizado THEN as animações do Spotlight e Glows SHALL rodar inteiramente via Keyframes CSS.
2. WHEN inspecionado o CSS THEN deve estar presente `will-change: transform, opacity` e `transform: translate3d()` para forçar hardware acceleration.
3. WHEN no Tier 3 THEN a animação original de rotação, opacity e scale SHALL funcionar idêntica a antes.

**Independent Test**: Monitoramento de FPS via DevTools (Performance tab) durante a página parada no Hero.

---

### P2: Trava de Scroll no Antes/Depois

**User Story**: Como um usuário mobile, quero deslizar o componente de Antes/Depois sem que a página acidentalmente role para cima ou para baixo.

**Why P2**: Melhora profundamente a experiência de interação (UX) do touch.

**Acceptance Criteria**:
1. WHEN o usuário inicia um PointerDown no slider THEN o `body` SHALL receber `overflow: hidden`.
2. WHEN o usuário inicia o PointerDown THEN o slider container SHALL ter `touch-action: none`.
3. WHEN o usuário solta o toque (PointerUp/Cancel) THEN a rolagem do `body` SHALL ser restaurada.

**Independent Test**: Emular dispositivo touch, arrastar o slider horizontalmente e tentar arrastar verticalmente; a página não deve rolar.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PERF-01 | P1: Degradação Suave (Hook) | Tasks | Pending |
| PERF-02 | P1: Aceleração GPU (CSS Keyframes) | Tasks | Pending |
| PERF-03 | P1: Consumir Tiers e CSS no Hero | Tasks | Pending |
| PERF-04 | P2: Scroll Lock no Slider | Tasks | Pending |

---

## Success Criteria

- [ ] CPU idle dropa de >15% para <2% em repouso no componente Hero (via DevTools).
- [ ] Scroll liso (60fps) garantido enquanto interage com o BeforeAfterSlider em emulação mobile.
