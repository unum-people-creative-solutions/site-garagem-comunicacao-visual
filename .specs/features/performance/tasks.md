# Performance Optimizations Tasks

**Design**: `TECH-DESIGN-performance-optimizations.md`
**Status**: Draft

---

## Execution Plan

### Phase 1: Foundation (Sequential)
T1 → T2

### Phase 2: Implementation (Parallel OK)
     ┌→ T3 [P] ─┐
T2 ──┼──────────┼──→ T5 (Validation)
     └→ T4 [P] ─┘

---

## Task Breakdown

### T1: Criar Hook `usePerformanceTier`

**What**: Implementar o hook para detecção de hardware (Tier 1 a 3).
**Where**: `src/hooks/usePerformanceTier.ts`
**Depends on**: None
**Reuses**: N/A
**Requirement**: PERF-01

**Tools**:
- MCP: `filesystem`

**Done when**:
- [ ] Hook exporta `tier` (1, 2 ou 3) e `isLowEnd` boolean.
- [ ] Hook lida com SSR (validação de `window` antes de acessar `navigator` ou `matchMedia`).
- [ ] Gate check passes: `npm run lint` e `npm run build` ou compilador TS.

**Tests**: none (hook de detecção de ambiente isolado)
**Gate**: quick

---

### T2: Adicionar Keyframes Otimizados para GPU

**What**: Migrar lógica de animação do Hero para CSS em globals.css com `will-change`.
**Where**: `src/styles/globals.css`
**Depends on**: T1
**Reuses**: N/A
**Requirement**: PERF-02

**Tools**:
- MCP: `filesystem`

**Done when**:
- [x] `@keyframes spotlight-left`, `spotlight-right`, e `ambient-glow` definidos usando exclusivamente `transform` e `opacity`.
- [x] Classes utilitárias criadas ativando as animações e forçando GPU (`will-change`).
- [x] Gate check passes: build/lint do tailwind/css.

**Tests**: none (CSS)
**Gate**: quick

---

### T3: Refatorar Componente Hero [P]

**What**: Remover props de animação contínua do framer-motion no Hero e aplicar classes CSS condicionalmente via Tiers.
**Where**: `src/components/Hero.tsx`
**Depends on**: T2
**Reuses**: `usePerformanceTier`
**Requirement**: PERF-01, PERF-02, PERF-03

**Tools**:
- MCP: `filesystem`

**Done when**:
- [ ] Componente importa e consome `usePerformanceTier`.
- [ ] Se Tier 1: Spotlight removido, Glows parados/ocultos.
- [ ] Se Tier 2: Spotlight fixo, Glows estáticos (sem classe de animação).
- [ ] Se Tier 3: Elementos usam classes do `globals.css` para animar (em vez de `animate` e `transition` do framer-motion de forma contínua).
- [ ] Gate check passes: Vitest/Lint.

**Tests**: unit (atualizar testes do Hero se existirem)
**Gate**: quick

---

### T4: Scroll Lock no BeforeAfterSlider [P]

**What**: Travar rolagem do `body` durante eventos de drag (PointerDown) do slider.
**Where**: `src/components/BeforeAfterSlider.tsx`
**Depends on**: T1 (estrutural, rodar paralelo a T3)
**Reuses**: N/A
**Requirement**: PERF-04

**Tools**:
- MCP: `filesystem`

**Done when**:
- [ ] Container possui classe Tailwind de `touch-none`.
- [ ] Handler de `PointerDown` define `document.body.style.overflow = "hidden"`.
- [ ] Handler de `PointerUp`/`PointerCancel` remove o hidden do `overflow`.
- [ ] useEffect cleanup garante que o body seja restaurado ao desmontar o componente em drag.
- [ ] Gate check passes: Vitest/Lint.

**Tests**: unit (atualizar testes do BeforeAfter se existirem)
**Gate**: quick

---

## Validation Checks (Pre-Approval)

### 1. Task Granularity Check
| Task | Scope | Status |
| --- | --- | --- |
| T1: Hook usePerformanceTier | 1 hook | ✅ Granular |
| T2: CSS Keyframes | 1 arquivo CSS | ✅ Granular |
| T3: Refatorar Hero | 1 componente | ✅ Granular |
| T4: Refatorar BeforeAfterSlider | 1 componente | ✅ Granular |

### 2. Diagram-Definition Cross-Check
| Task | Depends On | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | N/A (root) | ✅ Match |
| T2 | T1 | T1 -> T2 | ✅ Match |
| T3 | T2 | T2 -> T3 | ✅ Match |
| T4 | T2 | T2 -> T4 | ✅ Match (Corrigido da def inicial para bater no diagrama Phase 2) |

### 3. Test Co-location Validation
| Task | Code Layer Modified | Task Says | Status |
| --- | --- | --- | --- |
| T1 | Hook | none | ✅ OK (sem regras restritas para utils ambientais puros sem jest-dom setup) |
| T2 | CSS | none | ✅ OK |
| T3 | Componente React | unit | ✅ OK (Vitest / Testing Library) |
| T4 | Componente React | unit | ✅ OK |
