# Technical Design Document: Efeito Holofote Skywalker na Hero

## 1. Objetivo
Adicionar dois holofotes dinâmicos (estilo Skywalker/Searchlight) na seção Hero para reforçar a ideia de "destaque" e "visibilidade".

## 2. Abordagem Técnica
Utilizaremos `framer-motion` para animação e CSS puro para a estilização dos feixes de luz. Os holofotes serão posicionados nas extremidades inferiores da seção Hero.

### 2.1. Estrutura do Holofote
- **Elemento**: `motion.div`
- **Forma**: Triângulo longo e estreito criado via `clip-path` ou `conic-gradient`.
- **Estilo**: 
    - Cor: `var(--color-accent)` ou branco com baixa opacidade (~10-20%).
    - Efeito: `blur` alto e `gradient` para suavizar a ponta.
    - `mix-blend-mode`: `overlay` ou `screen` para interagir com o fundo.

### 2.2. Animação
- **Movimento**: Rotação oscilatória (sweep).
- **Independência**: Cada holofote terá durações e ângulos ligeiramente diferentes para evitar sincronia perfeita, criando um efeito mais natural.
- **Ponto de Origem**: `bottom center` do elemento, posicionado nos cantos inferiores da `section`.

## 3. Implementação
- Os holofotes serão inseridos como filhos diretos da `section` no `Hero.tsx`, atrás do conteúdo principal (Z-index baixo).
- Não há necessidade de novas dependências, pois `framer-motion` já está instalado.

## 4. Plano de Testes
- **Visual**: Verificar se os holofotes não cobrem o texto de forma a prejudicar a leitura.
- **Performance**: Garantir que as animações de GPU (`rotate`) não causem jank em dispositivos móveis.
- **Responsividade**: Os holofotes devem se ajustar ou ser ocultados em telas muito pequenas se poluirem demais o layout.
