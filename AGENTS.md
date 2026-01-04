# AGENTS.md

Guidance for AI assistants working with **KanaDojo** - a Japanese learning platform (Next.js 15, React 19, TypeScript).

---

## Shell Environment

**Windows PowerShell** - Use `;` to chain commands (not `&&`).

---

## Code Verification

**Use `npm run check` for all verification** (~10-30 seconds):

```powershell
npm run check    # TypeScript + ESLint combined
```

❌ **Never use `npm run build` for verification** - it's 1-2 minutes and adds no validation value.

---

## Commits

Follow the workflow in `.agent/workflows/commit-changes.md` when committing changes.

---

## Architecture

**Feature-based architecture**: Code organized by functionality, not file type.

```
app/           → Next.js pages, layouts, routing
features/      → Self-contained feature modules (Kana, Kanji, Vocabulary, etc.)
shared/        → Reusable components, hooks, utilities (used by 2+ features)
core/          → Infrastructure (i18n, analytics)
```

### Feature Structure

```
features/[name]/
├── components/    # Feature-specific React components
├── data/          # Static data and constants
├── lib/           # Feature-specific utilities
├── hooks/         # Feature-specific custom hooks
├── store/         # Zustand state management
└── index.ts       # Barrel export (public API)
```

---

## Key Conventions

- **Imports**: Use path aliases (`@/features/`, `@/shared/`, `@/core/`)
- **Styling**: Tailwind CSS + shadcn/ui + `cn()` for conditional classes
- **State**: Zustand with localStorage persistence
- **i18n**: `next-intl` with namespace-based translations in `core/i18n/locales/`
- **Components**: PascalCase files, `use` prefix for hooks/stores

---

## Don'ts

- ❌ Place business logic in `app/` pages
- ❌ Create circular dependencies between features
- ❌ Add to `shared/` unless used by 2+ features
- ❌ Hardcode user-facing strings (use translations)
- ❌ Ignore TypeScript errors
