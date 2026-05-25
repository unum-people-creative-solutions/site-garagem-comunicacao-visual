# Feature Spec: Hero & Proof (A Transformação)

## User Story
Como microempreendedor, quero ver imediatamente o impacto visual que a Garagem pode entregar para que eu me sinta confiante em solicitar um orçamento.

## Requirements
- **FR1 (Hero Content)**: Exibir Headline e Subheadline conforme copy estratégico.
- **FR2 (Hero CTA)**: Botão de destaque (Amarelo) que aciona o `openModal` do WhatsApp.
- **FR3 (Visual Proof)**: Implementar componente de Slider interativo para comparação Antes/Depois.
- **FR4 (Aesthetics)**: Aplicar recortes diagonais (`clip-diagonal`) e background com contraste agressivo.
- **FR5 (Responsive)**: A Hero deve ser impactante em telas mobile, com foco no CTA centralizado.

## Acceptance Criteria
- [ ] O componente de Slider permite mover o divisor manualmente.
- [ ] O CTA do WhatsApp está visível "above the fold".
- [ ] O design utiliza a paleta Preto/Amarelo corretamente.
- [ ] Animações de entrada suaves via Framer Motion.

## Design References
- Paleta: #0A0A0A (Black), #FFD700 (Yellow).
- Efeito: Halftone no background da Hero.
