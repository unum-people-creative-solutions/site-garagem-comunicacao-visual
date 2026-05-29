# Technical Design Document: Otimização de Performance Visual

## 1. Visão Geral
Otimizar a experiência visual do site para dispositivos com diferentes capacidades de hardware, implementando uma degradação suave (Graceful Degradation) em 3 níveis. Além disso, resolver travamentos no componente `BeforeAfterSlider` durante a interação mobile/touch.

## 2. Estratégia de Degradação Suave (3 Níveis)

Será criado um hook global `usePerformanceTier` que avaliará o dispositivo do usuário (usando `navigator.hardwareConcurrency`, `navigator.deviceMemory`, `navigator.connection` e `window.matchMedia('(prefers-reduced-motion: reduce)')`) para categorizá-lo em um de 3 níveis:

*   **Nível 1 (Dispositivos Modestos / Low-end):**
    *   *Regra:* Sem animações pesadas e sem efeitos CSS custosos (como `blur` massivo ou `mix-blend-mode`).
    *   *Comportamento:* O componente `Spotlight` não é renderizado. Animações contínuas são desativadas.
*   **Nível 2 (Dispositivos Intermediários / Mid-range):**
    *   *Regra:* Efeitos CSS permitidos (filtros estáticos mantidos), mas sem animações contínuas complexas.
    *   *Comportamento:* Componentes visuais mantêm seus gradientes/blurs, mas as animações (rotação do Spotlight, translação dos glows) são paralisadas ou severamente reduzidas.
*   **Nível 3 (Dispositivos Potentes / High-end):**
    *   *Regra:* Experiência completa.
    *   *Comportamento:* Todas as animações e efeitos CSS ativos.

## 3. Refatoração de Animações e Aceleração de GPU (Framer Motion -> CSS)
Para aliviar o main thread (CPU) e forçar a renderização na GPU (Hardware Acceleration), as animações contínuas (infinite loops) atualmente feitas com Framer Motion no componente `Hero` serão migradas para Keyframes CSS no arquivo `globals.css`:
*   **Propriedades Seguras para GPU:** As animações CSS utilizarão estritamente propriedades otimizadas para GPU: `transform` (translate, rotate, scale) e `opacity`. O navegador pode calcular essas mudanças na GPU sem precisar acionar os processos custosos de layout ou paint na CPU.
*   **Forçando o Compositing Layer:** Será aplicada a propriedade `will-change: transform, opacity;` nos elementos que animam continuamente (Spotlights e Glows) nos níveis 2 e 3. Isso sinaliza ao navegador para criar uma "layer" (camada) separada na GPU antecipadamente, prevenindo engasgos no início da animação.
*   **Elementos Afetados:**
    *   A animação do componente `Spotlight` (`rotate`, `opacity`).
    *   As animações dos *Dynamic Ambient Glows* (`transform: translate3d() scale()`). O uso de `translate3d` (mesmo com o eixo Z igual a 0) é um truque clássico para garantir a promoção para a GPU em navegadores mais antigos.

## 4. Otimização do BeforeAfterSlider (Scroll Lock & Layout Shift Prevention)
Para evitar o efeito de "scroll-jank" e eliminar permanentemente os saltos de layout (shifts) e o efeito de "chute" ao liberar o slider:
*   **Arquitetura scrollbar-gutter:** Aplicaremos `scrollbar-gutter: stable` no elemento `html` via CSS global. Esta propriedade moderna instrui o navegador a reservar permanentemente o espaço da barra de rolagem, garantindo que o layout permaneça estável mesmo quando `overflow: hidden` é aplicado.
*   **Touch Action:** O container do slider utilizará `touch-action: none` para prevenir interferências de gestos do sistema.
*   **Scroll Lock Simplificado:** Durante a interação (`is-dragging`), o `body` receberá apenas `overflow: hidden`. Como o espaço da barra já está reservado pelo *gutter*, não haverá deslocamento lateral de elementos fixos ou relativos.
*   **Remoção de Lógica Frágil:** Eliminaremos cálculos manuais de largura de barra de rolagem, variáveis CSS de compensação e classes de atraso (`is-resetting`), resultando em um código mais performático e manutenível.

## 5. Fluxo de Dados e Impacto nos Componentes
1.  **`src/hooks/usePerformanceTier.ts`**: Novo hook para detectar o nível (1, 2 ou 3).
2.  **`src/styles/globals.css`**: Adição de utilitários `@keyframes` e classes `.animate-spotlight-left`, `.animate-glow`, etc.
3.  **`src/components/Hero.tsx`**: Consumir `usePerformanceTier` para renderização condicional ou aplicação condicional das classes CSS de animação baseadas no tier.
4.  **`src/components/BeforeAfterSlider.tsx`**: Atualizar handlers de pointer/touch para bloquear scroll externo da página.

## 6. Riscos e Mitigações
*   *Falsos Positivos no Tier:* APIs como `deviceMemory` não são suportadas no Safari (iOS). A mitigação será assumir Nível 2 ou usar heurísticas (como tamanho de tela = mobile) como fallback de segurança.
*   *Acessibilidade:* Respeitar sempre o `prefers-reduced-motion` forçando o Tier 1 imediatamente caso o usuário tenha essa preferência ativada no SO.