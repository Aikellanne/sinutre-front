# SiNutre

O SiNutre é uma aplicação web para registro e acompanhamento de refeições, alimentos, consumo de macronutrientes e informações nutricionais do usuário. Este projeto foi desenvolvido como Projeto Final do curso de Formação em Desenvolvimento Web Moderno.

## Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI

### Backend

- Node.js
- Express
- Prisma ORM
- SQLite

## Funcionalidades desenvolvidas
- [x] Cadastro de alimentos
- [x] Alteração de alimentos
- [x] Exclusão de alimentos
- [x] Validação dos dados no cadastro e edição de alimentos
- [x] Cadastro de dados complementares do usuário
- [x] Alteração de dados complementares do usuário
- [x] Exibição da meta diária de calorias no Dashboard
- [x] Logout do usuário
- [x] Alteração das cores da interface

## Estrutura

```
src/
├── components/
│   ├── cards/      # AddMealCard, TotalMealsCard
│   ├── forms/      # FormField
│   ├── layout/     # Sidebar, SidebarBrand, SidebarItem, Header
│   ├── macros/     # MacroStat, MacroStatsBar
│   ├── meals/      # MealActionButton, MealFab, MealsList/Table…
│   └── modal/      # AddMealModal e suas sub-partes
├── constants/      # MEAL_CATEGORIES, NAV_ITEMS
├── data/           # mocks de usuário, macros e refeições
├── hooks/          # useMealModal
├── pages/          # DashboardPage
├── styles/         # tailwind + tema sinutre
├── types/          # tipos de domínio
├── App.tsx
└── main.tsx
```

## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/Aikellanne/sinutre-front.git
```

Entre na pasta:

```bash
cd sinutre-front
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Outros comandos disponíveis:

```bash
npm run build   # build de produção (tsc -b + vite build)
npm run lint    # ESLint em todo o projeto
npm run preview # preview do build
```

## Backend

O backend deste projeto encontra-se em um repositório separado.

Repositório: 
https://github.com/Aikellanne/sinutre-back

## Aplicação em produção

Frontend (Vercel):
https://...

Backend (Railway):
https://...

## Autoria

Projeto acadêmico com implementações e adaptações realizadas por Aikellanne Almeida.
