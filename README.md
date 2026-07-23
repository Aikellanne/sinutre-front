# SiNutre

O SiNutre é uma aplicação web para registro e acompanhamento de refeições, alimentos, consumo de macronutrientes e informações nutricionais do usuário.

Projeto desenvolvido como Projeto Final do curso de formação em desenvolvimento web moderno.

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

- [x] Alterar um alimento cadastrado
- [x] Excluir um alimento cadastrado
- [x] Cadastro e edição de alimentos com validação
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

## Scripts

```bash
npm install     # instala dependências
npm run dev     # servidor de desenvolvimento (vite)
npm run build   # build de produção (tsc -b + vite build)
npm run lint    # ESLint em todo o projeto
npm run preview # preview do build
```

## Backend

O backend do SiNutre está em um repositório separado.

Link do repositório: 

## Links da aplicação

Frontend (Vercel):

Backend (Railway):
