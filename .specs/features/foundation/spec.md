# Feature Spec: Foundation & Design System

## User Story
Como desenvolvedor, quero configurar o ambiente base do projeto para que possamos implementar componentes seguindo o Design System estabelecido.

## Requirements
- **FR1 (Setup)**: Inicializar projeto Next.js 15+ com App Router.
- **FR2 (Styling)**: Configurar Tailwind CSS v4 com a paleta de cores e tokens do projeto.
- **FR3 (Context)**: Implementar `LeadContext` para captura de parâmetros de URL (`gclid`, `utm_source`, etc.) conforme `@GENERAL_SPEC.md`.
- **FR4 (Tracking)**: Adicionar o `gtag.js` básico no `layout.tsx`.
- **FR5 (CRM Library)**: Criar helper para integração com a API de ingestão (`/ingest`).

## Acceptance Criteria
- [ ] O projeto compila sem erros.
- [ ] As cores `primary` (#0A0A0A) e `accent` (#FFD700) estão disponíveis via classes Tailwind.
- [ ] O `LeadContext` persiste dados da URL no localStorage/sessionStorage.
- [ ] Requisições para o CRM enviam os headers corretos (API Key).

## Testing Plan
- Unit tests para a lógica de mapeamento de origem do lead (origem = "Google Ads" if gclid exists).
- Verificação visual inicial das fontes e cores base.
