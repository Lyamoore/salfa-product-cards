# Salfa Testovoe

SPA приложение со списоком карточек персонажей из вселенной Гарри Поттера

# Стек
- Next.js 16 (App Router, статический export)
- TypeScript, Zustand, React Hook Form, Zod
- Material UI
- fetch данных (axios) из `https://hp-api.onrender.com/api/characters`

# Запуск локально
```bash
pnpm install
pnpm dev
# приложение будет на http://localhost:3000
```

# Продакшен / GitHub Pages
```bash
pnpm run build
pnpm run export
# статические файлы окажутся в папке out/
# Чтобы работали динамические страницы, реализованы generateStaticParams
```