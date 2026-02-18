# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

Add shadcn/ui components:
```bash
pnpm dlx shadcn@latest add <component-name>
```

## Architecture

**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (new-york style) + Radix UI + Lucide icons + next-themes

**App Router** with React Server Components enabled by default. Path alias `@/*` maps to project root.

**Route groups:**
- `app/(console)/` — all backoffice pages; gets sidebar + header layout automatically

**Key files:**
- `app/layout.tsx` — Root HTML shell: Geist fonts, `ThemeProvider` (next-themes), `TooltipProvider`
- `app/(console)/layout.tsx` — Console chrome: `SidebarProvider` + `AppSidebar` + `AppHeader` + `<main>`
- `app/(console)/page.tsx` — Dashboard (Server Component; stats cards + recent activity)
- `app/globals.css` — Tailwind v4 (`@import "tailwindcss"`), shadcn/ui OKLCH theme tokens, dark mode via `.dark` class
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `components/layout/app-sidebar.tsx` — Collapsible sidebar with nav groups + user footer dropdown (`"use client"`)
- `components/layout/app-header.tsx` — Breadcrumb + notifications + theme toggle (`"use client"`)
- `components/providers/theme-provider.tsx` — Thin next-themes wrapper (`"use client"`)

**Component conventions (shadcn/ui aliases):**
- `@/components/ui` — shadcn/ui generated components
- `@/components` — custom components
- `@/lib` — utilities
- `@/hooks` — custom React hooks

**Adding new console pages:** create `app/(console)/<route>/page.tsx` — the sidebar layout applies automatically. For public pages (login, etc.), create a separate `app/(auth)/` route group.

## Tailwind CSS v4

This project uses Tailwind v4's CSS-first configuration — there is no `tailwind.config.js`. All theme customization happens in `app/globals.css` via CSS variables and `@theme inline`. The PostCSS plugin is `@tailwindcss/postcss`.

## Component Variants

Use `class-variance-authority` (CVA) for component variants alongside the `cn()` helper:

```typescript
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
```

## UI Framework

**The chosen component system is shadcn/ui, built on top of Radix UI.** These are not two competing frameworks — they play different roles:

| Package | Role | Runtime? |
|---|---|---|
| `radix-ui` (dep) | Headless UI primitives — handles state, accessibility, keyboard nav | Yes |
| `shadcn` (devDep) | CLI code generator — runs `pnpm dlx shadcn add` to scaffold components | No |
| `components/ui/*.tsx` | The components you import — Tailwind-styled wrappers around Radix UI | Generated |

**Rules:**
- Always import UI components from `@/components/ui/` (e.g. `import { Button } from "@/components/ui/button"`)
- Never import directly from `radix-ui` in application code — go through the `components/ui/` wrappers
- Add new components with: `pnpm dlx shadcn@latest add <component-name>`

## RSC Boundaries

- Files are Server Components by default — no `"use client"` needed unless using browser APIs, event handlers, hooks, or context
- Async `params` and `searchParams` in page/layout components must be awaited (Next.js 16)
- Use `"use server"` for Server Actions; `"use cache"` for caching semantics

## i18n — next-intl

Cookie-based locale (no URL prefix) — appropriate for backoffice where locale is a user preference.

- **`i18n/request.ts`** — server-side request config; reads `locale` cookie, falls back to `'en'`
- **`messages/en.json`** + **`messages/th.json`** — translation files
- **`actions/locale.ts`** — Server Action `setLocale('en'|'th')` writes cookie + revalidates layout
- **`next.config.ts`** — wrapped with `createNextIntlPlugin('./i18n/request.ts')`

In **Server Components**: `import { getTranslations, getLocale } from 'next-intl/server'`
In **Client Components**: `import { useTranslations } from 'next-intl'`

```ts
// Server Component
const t = await getTranslations('examples')
t('title')              // string
t('i18n.greeting', { name: 'Admin' })

// Client Component
const t = useTranslations('examples.form')
t('submit')
```

## Form Validation — react-hook-form + Zod

**Note:** Use **Zod v3** (`zod@3`). Zod v4 is incompatible with `@hookform/resolvers` at this time.

```ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({ name: z.string().min(2) })
type Values = z.infer<typeof schema>

const form = useForm<Values>({ resolver: zodResolver(schema) })
```

See `components/examples/profile-form.tsx` for a complete example.

## Date & Number Formatting — dayjs + numeral

- **`lib/dayjs.ts`** — configures dayjs with `buddhistEra`, `utc` plugins and `th` locale; import from here, not from `dayjs` directly
- **`hooks/use-formatter.ts`** — `"use client"` hook exposing: `dateFormat`, `timeFormat`, `dateTimeFormat`, `utcFormat`, `phoneFormat`, `idCardFormat`, `numberFormat`, `priceFormat`, `mbToBytes`

```ts
import { useFormatter } from '@/hooks/use-formatter'
const { dateFormat, priceFormat } = useFormatter()
dateFormat('2024-06-15')   // → "15/06/2567" (Buddhist era)
priceFormat(9999.99)       // → "9,999.99"
```

## Design System — Three-layer Architecture

Single source of truth for colors and typography:

| Layer | File | Role |
|---|---|---|
| Raw values | `app/design-tokens.css` | CSS variables with actual OKLCH color/font values |
| Tailwind bridge | `app/globals.css` `@theme inline` | Maps CSS vars → Tailwind utility classes |
| TS reference | `lib/tokens/colors.ts` + `lib/tokens/typography.ts` | Named references for JS/TS (charts, style props) |

**To change a color:** edit ONE var in `app/design-tokens.css` — propagates everywhere.

**Available Tailwind utilities from design tokens:**
- Colors: `bg-success`, `text-danger`, `bg-warning`, `bg-info`, `bg-success-toast-bg`, etc.
- Typography: `text-title-1` … `text-title-6`, `text-subtitle`, `text-body`, `text-body-small`, `text-body-tiny`, `text-button`, `text-button-small`, `text-link`

```ts
// In JS/TS (charts, dynamic styles):
import colors from '@/lib/tokens/colors'
colors.success  // → 'var(--color-success)'
```

## Global State — Zustand

No Provider needed. Works in any Client Component.

- **`stores/app-store.ts`** — `useAppStore` with `count`, `increment`, `reset`

```ts
import { useAppStore } from '@/stores/app-store'
const { count, increment } = useAppStore()
```

Add new slices in `stores/` as separate files.

## Toast Notifications — Sonner

`<Toaster>` is mounted in `app/layout.tsx`. Use the typed helper — never import `sonner` directly in components.

```ts
import { notify } from '@/lib/toast'
notify.success('Saved!')
notify.error('Failed.')
notify.warning('Check this.')
notify.info('FYI.')
```

## API Client

`lib/api.ts` exports `createApiClient` and `ApiError`.

```ts
import { createApiClient, ApiError } from "@/lib/api"

const api = createApiClient({
  baseUrl: process.env.API_URL!,
  // Wire auth later — next-auth, cookie, etc.:
  getToken: () => /* session?.accessToken */ undefined,
})
```

- `getToken` is optional; omit for unauthenticated clients. When provided it may be async (token refresh).
- Throws `ApiError` (with `.status`, `.statusText`, `.body`) on non-2xx responses.
- Supports Next.js `cache` / `next.revalidate` / `next.tags` fetch extensions via `RequestOptions`.
- **Never call `fetch` directly for API requests** — always go through the client so auth headers are applied consistently.
