# DIAGNÓSTICO — Nomos Central MVP

> Documento de referência antes do redesign visual. Consolida o estado atual do projeto: arquitetura, telas, sistema de design vigente, conflitos com o `design_sistemy.md` proposto, segurança e estratégia de migração.
>
> Gerado em: 2026-05-17. Branch: `main` @ `1d0fe7f`. Sincronizado com `upstream/main` (`eMMsteiin/nomos-central-mvp`) — fork divergiu em 1 commit (higiene `.env`).

---

## 1. Visão geral

Nomos Central MVP é um app web de produtividade para estudantes, com 4 grandes domínios funcionais:

- **Tarefas e blocos de estudo** (Hoje, Em Breve, Concluído, detalhes, modo foco com timer)
- **Caderno digital** (folders, notebooks com páginas, editor com canvas de desenho usando `perfect-freehand`)
- **Flashcards estilo Anki** (decks, sessão de revisão com algoritmo SM-2, estatísticas, geração via IA)
- **Resumos e lembretes rápidos** (post-its em cork-board, resumos gerados por IA)

Acessório: aba de "ferramentas externas" estilo navegador embutido, modo foco com sidebar lateral, configurações.

Auth é **anônima** (cada sessão cria um usuário Supabase anônimo no boot; JWT persistido em `localStorage`). Não há tela de login/cadastro hoje.

O projeto foi scaffoldado e continua sendo editado também via **Lovable.dev** (dependência `lovable-tagger`, pasta `.lovable/`).

---

## 2. Stack técnica

### Core
| Camada | Tecnologia |
|---|---|
| Framework | React 18.3 + TypeScript 5.8 |
| Build | Vite 5.4 (`@vitejs/plugin-react-swc`) |
| Roteamento | `react-router-dom` v6 |
| Estado server | `@tanstack/react-query` v5 |
| Backend | Supabase (`@supabase/supabase-js` v2) — PostgreSQL + Edge Functions + Storage |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` |

### UI / Estilo
| Camada | Tecnologia |
|---|---|
| Componentes base | shadcn/ui completo (~49 componentes em `src/components/ui/`) |
| Primitivos | ~30 pacotes `@radix-ui/react-*` |
| CSS | Tailwind 3.4 + `tailwindcss-animate` + `@tailwindcss/typography` |
| Animação | `framer-motion` v12 |
| Tema | `next-themes` v0.3 **(instalado, ainda não usado)** |
| Ícones | `lucide-react` |
| Drag & Drop | `@dnd-kit/*` |

### Específicos do domínio
- `react-day-picker`, `date-fns`, `ical.js` — calendário e importação ICS
- `jspdf`, `react-pdf`, `pdfjs-dist` — import/export PDF
- `perfect-freehand` + `src/utils/strokeSmoothing.ts` — canvas de desenho
- `recharts` — gráficos (estatísticas de estudo)
- `cmdk`, `sonner`, `vaul`, `embla-carousel-react`, `input-otp`, `react-markdown`, `react-resizable-panels`

### TypeScript
- Strict mode **desligado** (`noImplicitAny` e `strictNullChecks` off em `tsconfig`)
- `src/integrations/supabase/types.ts` é **auto-gerado** pelo Supabase CLI — nunca editar à mão

### Sem
- Nenhuma fonte custom configurada (usa `system-ui`)
- Nenhum sistema de tema além da classe `dark` do Tailwind
- Nenhuma suíte de testes

---

## 3. Rotas e telas (15)

Definidas em `src/App.tsx`. Layout fixo em todas: `AppSidebar` (esquerda) + `AppHeader` (topo) + `FocusStatusBar` + `FocusSidebar` (direita) + `ExternalToolsTabs`.

| Rota | Componente | Função |
|---|---|---|
| `/` | `Index` → `NomosHome` | Caixa de entrada / dashboard inicial |
| `/hoje` | `Hoje` | Tarefas e blocos de estudo de hoje |
| `/em-breve` | `EmBreve` | Tarefas futuras |
| `/resumos` | `Resumos` | Resumos gerados de notas |
| `/concluido` | `Concluido` | Histórico de tarefas concluídas |
| `/lembretes-rapidos` | `LembretesRapidos` | Post-its em cork-board |
| `/caderno` | `Caderno` | Biblioteca de cadernos (folders + notebooks) |
| `/caderno/:notebookId` | `NotebookView` | Editor de notebook (texto + canvas) |
| `/caderno-dev-test` | `CadernoDevTest` | Página interna de teste |
| `/flashcards` | `Flashcards` | Anki-like: decks, revisão, stats |
| `/modo-foco` | `ModoFoco` | Tela de foco com timer e ambiente reduzido |
| `/tarefa/:id` | `TaskDetail` | Detalhe de uma tarefa |
| `/projetos/primeiros-passos` | `PrimeirosPassos` | Onboarding / tutorial |
| `/configuracoes` | `Configuracoes` | Configs (sub: `modo-foco`, `integracoes`) |
| `*` | `NotFound` | 404 |

**Bugs pré-existentes em `App.tsx`**: rotas `/tarefa/:id` e `*` aparecem 2× cada (linhas 78-79 e 85-86). Sem efeito funcional, mas vale limpar.

**Não existe landing page hoje.** A rota `/` é um dashboard de uso interno.

---

## 4. Estrutura de pastas (profundidade 3)

```
nomos-central-mvp/
├── public/
├── supabase/
│   ├── functions/                  (6 edge functions)
│   ├── migrations/                 (16 migrations SQL)
│   └── config.toml
├── src/
│   ├── App.tsx, main.tsx, index.css
│   ├── pages/                      (16 arquivos = rotas)
│   ├── components/                 (154 arquivos no total)
│   │   ├── ui/                     (49 — shadcn completo)
│   │   ├── notebook/               (36 — editor + canvas + library)
│   │   │   ├── canvas/
│   │   │   └── library/
│   │   ├── flashcards/             (22 — deck, sessão, stats)
│   │   ├── task/                   (13)
│   │   │   └── blocks/
│   │   ├── summaries/              (6)
│   │   ├── focus/                  (4)
│   │   ├── tools/                  (4 — abas externas)
│   │   ├── blocks/                 (3 — blocos de calendário)
│   │   ├── canva/                  (2)
│   │   ├── configuracoes/          (1)
│   │   └── *.tsx (raiz)            AppHeader, AppSidebar, NomosHome, PostIt, PostItBoard, AddTaskDialog, EditTaskDialog, ImportCalendarModal, ImportPdfDialog, FullscreenTimer, StudyBlockItem, StudyBlockTimer, ToolsDialog
│   ├── contexts/                   (5 — Auth, FocusMode, HiddenTabs, CanvaSession, ExternalTools)
│   ├── hooks/                      (40 — useFlashcards, useNotes, useBlocks, etc.)
│   │   └── notebook/
│   │       ├── mutations/
│   │       ├── realtime/
│   │       └── utils/
│   ├── integrations/supabase/      (client + types auto-gerados)
│   ├── utils/                      (ankiAlgorithm, templateRenderer, clozeParser, strokeSmoothing)
│   ├── services/, types/, data/, lib/
├── tailwind.config.ts
├── vite.config.ts
├── package.json
├── design_sistemy.md               (NOVO design system proposto)
├── DIAGNOSTICO.md                  (este arquivo)
└── .env.example                    (recém-criado; .env agora untracked)
```

---

## 5. Sistema de design ATUAL

### Filosofia explícita (em `src/index.css`, linha 97)

> "NOMOS Design System - Ultra Minimalist  
> Paleta: Preto, Branco, 3 tons de cinza  
> Tipografia: system-ui (Inter-like)  
> Filosofia: A interface deve desaparecer enquanto o usuário pensa."

### Paleta (CSS variables em `:root` e `.dark`)
- **Light (padrão atual)**: branco puro, preto suave, cinzas. Sem accent color.
- **Dark**: preto profundo `hsl(0 0% 6%)`, branco suave `hsl(0 0% 95%)`. Mesmo padrão grayscale.
- `--destructive` é cinza escuro (não vermelho) — vai contra convenções, "errante" intencional do minimalismo.

### Tipografia
- `system-ui` (sem fonte custom)
- Regras globais em `index.css`:
  - `h1 { @apply text-xl }` (20px)
  - `h2 { @apply text-lg }` (18px)
  - `h3 { @apply text-base }` (16px)
- Todos com `font-medium tracking-tight`

### Border radius
- `--radius: 0.375rem` (6px)

### Container Tailwind
- `padding: 2rem`, max `2xl: 1400px`

### Componentes shadcn — todos presentes
`src/components/ui/` tem todos os 49 componentes: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip.

### Outros estilos custom em `index.css`
- Cork-board (lembretes rápidos) — textura simulada em CSS
- Post-it landing animation
- Focus mode utilities (`.focus-minimal`, `.focus-essential`, `.focus-active`)
- Scrollbar custom
- Cloze deletion (`.cloze`, `.cloze-blank`) — pra flashcards
- Fonte handwriting (Caveat via Google Fonts) — só pra post-its
- `user-select: none` global pra iPad (desabilita callout do iOS)

---

## 6. Conflitos com `design_sistemy.md`

Tabela 1:1 entre o atual e o proposto:

| Aspecto | Estado atual | Proposto pelo design system | Severidade |
|---|---|---|---|
| **Paleta** | 100% grayscale (preto/branco/cinza), light default | Dark default `#08090A`, accent color, semânticas (azul/amarelo/verde/vermelho) reservadas ao app | **ALTA** — substituição total |
| **Accent color** | Não existe (`--accent` = cinza claro) | A definir: `#10B981` ou branco com glow | **BLOQUEADOR** |
| **Tipografia** | system-ui, `h1=20px` | Geist + Geist Mono, `h1=72px desktop / 44px mobile` | **ALTA** — fonte + escala radicalmente diferentes |
| **Border radius** | `--radius: 0.375rem` (6px) | 8/12/16-20px conforme contexto | MÉDIA |
| **Container** | `padding: 2rem`, max `1400px` | `padding: 24/48/96px`, max `1280px` | BAIXA |
| **Glow effects** | Inexistente | Obrigatório em CTAs, hover de cards, logo no hero | NOVA capacidade |
| **Noise/Grain** | Inexistente | Overlay 3-5% sobre background dark | NOVA capacidade |
| **Mockups** | Não há | Sombra `0 30px 80px rgba(0,0,0,.5)`, rotateY -5°/-10° | NOVA capacidade |
| **Animações** | Pontuais (acordeão, post-it landing) | Sistema completo com easing `cubic-bezier(0.16, 1, 0.3, 1)`, fade+translateY no scroll, scale 1.02 no hover | MÉDIA |
| **Modo claro/escuro** | Classe `dark` existe mas sem toggle | Obrigatório toggle no navbar, localStorage, `prefers-color-scheme`, transição 300ms | MÉDIA (já tem `next-themes` instalado, basta usar) |
| **Componentes "novos"** | Já existem como shadcn: Button, Card, Badge | Design system pede mesmos nomes | RESOLVÍVEL — customizar tokens shadcn em vez de duplicar |
| **Filosofia** | "Interface deve desaparecer" — ultraminimalismo, sem accent | "Sofisticação minimalista" com glow, gradientes sutis, mockups inclinados | **ALTA** — visão de produto diferente |

### Conflitos secundários que merecem atenção

- **Regras globais de `h1`-`h6` no `index.css`** estão hard-coded em `text-xl/lg/base` — vão precisar ser escopadas (ex: só na landing) ou removidas, porque H1=72px **não funciona** dentro do app produtivo (Hoje, Caderno, etc.)
- **Hipótese:** o design system foi pensado para um **site/landing**, não para um app de produtividade denso. Talvez precise de "dialeto site" vs "dialeto app".

---

## 7. Métricas de uso de estilos (varredura no código)

Resultados de `grep` em `src/`:

| Métrica | Valor | Implicação para migração |
|---|---|---|
| Usos de tokens shadcn (`bg-background`, `text-foreground`, etc.) | **1.055** | ✅ Migram automaticamente quando trocarmos as CSS variables |
| Cores Tailwind hardcoded (`bg-blue-500`, `text-red-600`, etc.) | **442** em **19 arquivos** | ⚠️ Precisam ser convertidas para tokens semânticos (`bg-info`, `text-destructive`, `bg-success-soft`) à mão |
| `hsl(...)` inline em className | **68** | ⚠️ Provavelmente cork-board e post-its — revisar caso a caso |
| `font-medium/semibold/bold` etc. | Frequente em flashcards/sidebar/notebook | Manter, só re-checar com nova fonte (Geist) |
| `text-sm/xs/base` etc. | Frequente | OK |
| `rounded-md/sm/lg/full` | Frequente | Re-mapear via `--radius` |

---

## 8. Segurança e backend

### 8.1 `.env` — RESOLVIDO ✅
- Estava trackeado em git (commit `79b6708` do bot do gpt-engineer-app)
- Conteúdo: **3 variáveis `VITE_*` da Supabase**, todas publishable/anon — nenhuma crítica
- Action tomada (commit `1d0fe7f`):
  - `.env` removido do tracking (`git rm --cached`)
  - `.env.example` criado com nomes das vars
  - `.gitignore` ganhou bloco `.env / .env.* / !.env.example`
  - Push pra `origin/main` feito
- **Upstream do Stein ainda tem o mesmo `.env` trackeado** (blob `235b4b3`). Decisão pendente: abrir PR de cortesia.
- Histórico **não foi reescrito** (decisão acordada). A chave anon continua visível no commit `79b6708` — aceitável porque é publishable e protegida por RLS.
- A chave decodifica para `{"role":"anon", "ref":"bvqbnhisnwzqshkuucam", ...}` — JWT válido até 2035.

### 8.2 Project ID — ATENÇÃO ⚠️

**Há dois project IDs diferentes no repositório:**

| Lugar | Project ID | Uso |
|---|---|---|
| `.env` | **`bvqbnhisnwzqshkuucam`** | O que o app deployado realmente usa (lido em `src/integrations/supabase/client.ts`) |
| `supabase/config.toml` | `nzylcotxxxcpzrxiafvt` | Só usado pelo `supabase` CLI local. Possivelmente herança do upstream |

→ Quando for ao dashboard do Supabase para verificar RLS, **acesse o projeto `bvqbnhisnwzqshkuucam`**.

### 8.3 RLS (Row Level Security)

24 tabelas mapeadas. **Todas têm `ENABLE ROW LEVEL SECURITY`** nas migrations:

| Domínio | Tabelas |
|---|---|
| Chat (legado?) | `conversations`, `messages`, `chat_actions_log` |
| Flashcards | `flashcard_decks`, `flashcards`, `flashcard_reviews`, `flashcard_sessions`, `deck_daily_stats`, `deck_option_presets`, `deck_sources` |
| Notes | `note_types`, `card_templates`, `notes` |
| Tasks | `tasks`, `subtasks`, `task_attachments`, `task_blocks`, `subtask_attachments` |
| Notebook | `notebook_element_collections`, `notebook_folders`, `notebooks`, `notebook_pages`, `notebook_elements`, `notebook_paper_templates`, `notebook_user_preferences` |

**Risco residual (a verificar no dashboard):**

- Migrations iniciais criaram policies tipo `USING (true)` / `"Anyone can ..."` em várias tabelas (RLS teatro)
- Migrations posteriores (`20251225215921`, `20260415121955`) reescreveram para `auth.uid() = user_id`
- **Confirmar no dashboard que TODAS as policies finais são "Users can ... their own ..." e que NENHUMA "Anyone can ..." sobrou**

Padrão "builtin" em `notebook_element_collections` e `notebook_paper_templates` (`USING auth.uid() = user_id OR is_builtin = TRUE`) é intencional, mas as policies de INSERT **não restringem** `is_builtin = TRUE` — usuário malicioso pode em tese se promover a "sistema" para aparecer em decks dos outros. Impacto baixo, mas vale fechar depois.

### 8.4 Edge Functions

6 funções em `supabase/functions/`: `fetch-ics`, `generate-flashcards`, `generate-flashcards-from-sources`, `generate-summary`, `generate-task-title`, `process-deck-source`.

- Todas com `verify_jwt = false` no `config.toml` (Supabase não verifica no gateway)
- **MAS** todas validam `authHeader` manualmente em código e propagam o JWT do usuário ao criar o client → operações de DB passam por RLS
- **Nenhuma usa `SUPABASE_SERVICE_ROLE_KEY`** (confirmado por grep, zero matches)
- Usam segredos server-side (configurados no dashboard, NÃO no `.env` do frontend):
  - `GEMINI_API_KEY` — em 3 funções
  - `LOVABLE_API_KEY` — em 2 funções

→ Se vazarem: custo $ na conta da API, sem acesso a dados.

### 8.5 Frontend

35 queries Supabase em 10 hooks. Tudo passa pelo singleton em `src/integrations/supabase/client.ts` com `persistSession: true` em `localStorage`. RLS é a única linha de defesa.

---

## 9. Inventário de componentes afetados por redesign

### Nível CRÍTICO (mudança propaga pra todo o app)
- `src/index.css` (linhas 97-191) — toda a paleta CSS variables
- `tailwind.config.ts` — `colors`, `borderRadius`, `container`, `fontFamily` (ainda não existe)
- `src/components/ui/*` (49 componentes shadcn) — herdam tokens automaticamente, mas radius/tamanhos podem precisar tuning

### Nível ALTO (estrutura visível em todas as rotas)
- `src/components/AppSidebar.tsx`
- `src/components/AppHeader.tsx`
- `src/components/NomosHome.tsx` (tela `/`)
- `src/components/focus/FocusStatusBar.tsx`, `FocusSidebar`
- `src/components/tools/ExternalToolsTabs.tsx`

### Nível MÉDIO (features grandes)
- `src/components/notebook/` (36) — editor + library + canvas (texturas próprias)
- `src/components/flashcards/` (22) — sessão de estudo, deck browser, stats com `recharts`
- `src/components/task/` (13)
- `src/components/blocks/` (3) — blocos de calendário

### Hotspots de hardcoded color (varrer manualmente)
19 arquivos com `bg-{red,blue,green,yellow,...}-{100..900}` espalhados. Convertir para tokens semânticos (`success`, `warning`, `destructive`, `info`).

---

## 10. Estimativa de complexidade

| Cenário | Complexidade | Tempo (estimativa) |
|---|---|---|
| **Só landing page nova em `/`** | Baixa-Média | 1-3 dias |
| **Só redesign do app existente** | Alta | 1-2 semanas |
| **Landing + redesign do app** | Alta+ | 2-3 semanas |

Justificativa para "Alta" do redesign:
- 154 componentes consomem tokens — troca de paleta é "barata" via CSS variables
- Mas 442 cores hardcoded em 19 arquivos exigem varredura à mão
- Hierarquia tipográfica do design system (H1=72px) é de landing, não de app — vai precisar "dialeto app" vs "dialeto site"
- Cork-board, post-its, canvas têm texturas próprias que vão precisar de recalibração
- AppSidebar/Header/FocusStatusBar precisam refino fino

---

## 11. Estratégia de migração — recomendação

### Híbrido em 3 fases (recomendada)

| Fase | Escopo | Tempo | Por quê |
|---|---|---|---|
| **0** | Landing isolada em `/`, com tokens adicionais (não substitutivos): `--brand-bg`, `--brand-accent`, classes scoped tipo `landing:*` | 1-3 dias | Dá feedback visual real do design system **antes** de comprometer o app. Permite calibrar accent color na prática. |
| **1** | Substituir tokens globais (`--background`, `--foreground`, `--primary`, etc.) pelos valores do design system. Migrar as 442 cores hardcoded pra tokens semânticos. Ajustar regras globais de `h1`-`h6`. | 2-3 dias | Os 1055 usos de tokens migram automaticamente. Trabalho braçal mas mecânico. |
| **2** | Polimento por área (AppSidebar, Header, NomosHome, Flashcards, Notebook). PR por área. | 1-2 semanas (paralelo) | Refino fino (radii, glow, hover states) sem big-bang. |

### Alternativas consideradas
- **Big bang**: consistência imediata mas risco grande e bloqueio de releases. Não recomendado.
- **Tela por tela puro**: convivência feia (sidebar nova com tela antiga) por causa do escopo global dos tokens shadcn. Não recomendado.

---

## 12. Decisões pendentes (BLOQUEADORES)

Antes de criar branch de redesign:

1. **Escopo**: só landing? só redesign do app? landing + redesign?
2. **Accent color**: `#10B981` (verde-elétrico)? branco puro com glow? outra cor?
3. **Localização da landing** (se for o caso): dentro de `nomos-central-mvp/` (rota `/` substituindo `Index`) ou projeto separado?
4. **Cortesia ao Stein**: avisar/abrir PR sobre o `.env` no upstream?
5. **Migration to-do agora ou depois**: o `.env` ainda referencia chave `bvqbnhisnwzqshkuucam` — você quer rotacionar essa chave anon como higiene simbólica antes do redesign?

---

## 13. Próximos passos imediatos

1. ✅ Sincronia com upstream — feita
2. ✅ Higiene `.env` — feita
3. ✅ Investigação RLS — feita (relatório separado entregue)
4. ✅ Diagnóstico — este documento
5. ⏳ **Verificação manual no dashboard Supabase** (você):
   - Project ID correto: `bvqbnhisnwzqshkuucam`
   - Confirmar que RLS está ON nas 24 tabelas
   - Confirmar que NÃO existe nenhuma policy "Anyone can ..." sobrando
6. ⏳ Decidir os 5 bloqueadores acima
7. ⏳ Criar branch `redesign/<algo>` com nome adequado ao escopo decidido
8. ⏳ Iniciar Fase 0 (landing isolada com tokens adicionais) — se escopo incluir landing

---

## Apêndice — Comandos úteis

```bash
# Sincronizar com upstream antes de cada sessão
git fetch upstream && git log --oneline main..upstream/main

# Branch nova para o trabalho de redesign
git checkout -b redesign/<nome>

# Rebase em cima do upstream se Stein commitou algo
git fetch upstream && git rebase upstream/main
```
