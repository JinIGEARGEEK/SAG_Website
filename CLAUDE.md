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

**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (new-york style) + Radix UI + Lucide icons

**App Router** with React Server Components enabled by default. Path alias `@/*` maps to project root.

**Key files:**
- `app/layout.tsx` — Root layout with Geist/Geist Mono fonts via CSS variables
- `app/globals.css` — Tailwind v4 (`@import "tailwindcss"`), shadcn/ui theme tokens as CSS variables, dark mode via `.dark` class
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Component conventions (shadcn/ui aliases):**
- `@/components/ui` — shadcn/ui generated components
- `@/components` — custom components
- `@/lib` — utilities
- `@/hooks` — custom React hooks

## Tailwind CSS v4

This project uses Tailwind v4's CSS-first configuration — there is no `tailwind.config.js`. All theme customization happens in `app/globals.css` via CSS variables and `@theme inline`. The PostCSS plugin is `@tailwindcss/postcss`.

## Component Variants

Use `class-variance-authority` (CVA) for component variants alongside the `cn()` helper:

```typescript
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
```

## RSC Boundaries

- Files are Server Components by default — no `"use client"` needed unless using browser APIs, event handlers, hooks, or context
- Async `params` and `searchParams` in page/layout components must be awaited (Next.js 16)
- Use `"use server"` for Server Actions; `"use cache"` for caching semantics
