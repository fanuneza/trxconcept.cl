# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for TRX Concept, a personal training business in Santiago, Chile. Hosted on GitHub Pages at `trxconcept.cl`. No build step — edit files and push directly to deploy.

## Development

No package manager or build tools. To preview locally, open `index.html` in a browser or use any static file server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Architecture

Multi-page static site. One shared stylesheet (`assets/css/style.css`). Pages:

| File | URL |
|---|---|
| `index.html` | `/` — main landing page |
| `sobre-mi/index.html` | `/sobre-mi` — about page |
| `servicios/index.html` | `/servicios` — services page |
| `preguntas-frecuentes/index.html` | `/preguntas-frecuentes` — FAQ page |
| `assets/index.html` | `/assets` — printable logos |

All pages share the same header/footer markup and the same inline `<script>` block at the bottom of `<body>`. When changing header/nav/scroll logic, update all pages.

**External dependencies (CDN only):**
- Bootstrap 5.3.7
- Montserrat (Google Fonts) + Impact (cdnfonts)
- Google Analytics 4 (GA ID: `G-P1W5Z80ZJS`)

**Assets:** `assets/img/` holds WebP images; `assets/icons/` holds the WhatsApp SVG mask.

## CSS Conventions

CSS variables are defined in `:root` — use them for any new styles:
- `--color-primary`: `#ffd700` (gold)
- `--color-black`, `--color-white`, `--color-gray-*`
- Fluid typography via `clamp()`
- Responsive breakpoints: `992px`, `768px`, and `576px`

## Header / Scroll Behavior

The `.site-header` is `position: fixed` (not sticky) so its size changes never affect `window.scrollY`. `<main>` has `padding-top: 7rem` (6rem at <992px) to compensate, and a CSS gradient that colors the padding area gold — this prevents a white flash when the header transitions back to full size on scroll-up.

The `.scrolled` class is added/removed by an inline script using **hysteresis + rAF**:
- Added when `scrollY > 70`
- Removed when `scrollY < 50`
- Gated behind `requestAnimationFrame` so only one evaluation runs per paint frame

When `.scrolled` is active: `padding-block` on `.header-inner` shrinks to `0.4rem` and `.brand img` shrinks to `3rem` (both with `0.25s ease` transitions). Do not change the transitions to layout-affecting values without re-testing the scroll oscillation bug.

## Contact / CTA

All WhatsApp links point to `https://wa.me/56984402664`. Update this number if the contact changes.


## Code Exploration Policy

Always use jCodemunch-MCP tools for code navigation. Never fall back to Read, Grep, Glob, or Bash for code exploration.
**Exception:** Use `Read` when you need to edit a file — the agent harness requires a `Read` before `Edit`/`Write` will succeed. Use jCodemunch tools to *find and understand* code, then `Read` only the specific file you're about to modify.

**Start any session:**
1. `resolve_repo { "path": "." }` — confirm the project is indexed. If not: `index_folder { "path": "." }`
2. `suggest_queries` — when the repo is unfamiliar

**Finding code:**
- symbol by name → `search_symbols` (add `kind=`, `language=`, `file_pattern=`, `decorator=` to narrow)
- decorator-aware queries → `search_symbols(decorator="X")` to find symbols with a specific decorator (e.g. `@property`, `@route`); combine with set-difference to find symbols *lacking* a decorator (e.g. "which endpoints lack CSRF protection?")
- string, comment, config value → `search_text` (supports regex, `context_lines`)
- database columns (dbt/SQLMesh) → `search_columns`

**Reading code:**
- before opening any file → `get_file_outline` first
- one or more symbols → `get_symbol_source` (single ID → flat object; array → batch)
- symbol + its imports → `get_context_bundle`
- specific line range only → `get_file_content` (last resort)

**Repo structure:**
- `get_repo_outline` → dirs, languages, symbol counts
- `get_file_tree` → file layout, filter with `path_prefix`

**Relationships & impact:**
- what imports this file → `find_importers`
- where is this name used → `find_references`
- is this identifier used anywhere → `check_references`
- file dependency graph → `get_dependency_graph`
- what breaks if I change X → `get_blast_radius`
- what symbols actually changed since last commit → `get_changed_symbols`
- find unreachable/dead code → `find_dead_code`
- class hierarchy → `get_class_hierarchy`

## Session-Aware Routing

**Opening move for any task:**
1. `plan_turn { "repo": "...", "query": "your task description", "model": "<your-model-id>" }` — get confidence + recommended files; the `model` parameter narrows the exposed tool list to match your capabilities at zero extra requests.
2. Obey the confidence level:
   - `high` → go directly to recommended symbols, max 2 supplementary reads
   - `medium` → explore recommended files, max 5 supplementary reads
   - `low` → the feature likely doesn't exist. Report the gap to the user. Do NOT search further hoping to find it.

**Interpreting search results:**
- If `search_symbols` returns `negative_evidence` with `verdict: "no_implementation_found"`:
  - Do NOT re-search with different terms hoping to find it
  - Do NOT assume a related file (e.g. auth middleware) implements the missing feature (e.g. CSRF)
  - DO report: "No existing implementation found for X. This would need to be created."
  - DO check `related_existing` files — they show what's nearby, not what exists
- If `verdict: "low_confidence_matches"`: examine the matches critically before assuming they implement the feature

**After editing files:**
- If PostToolUse hooks are installed (Claude Code only), edited files are auto-reindexed
- Otherwise, call `register_edit` with edited file paths to invalidate caches and keep the index fresh
- For bulk edits (5+ files), always use `register_edit` with all paths to batch-invalidate

**Token efficiency:**
- If `_meta` contains `budget_warning`: stop exploring and work with what you have
- If `auto_compacted: true` appears: results were automatically compressed due to turn budget
- Use `get_session_context` to check what you've already read — avoid re-reading the same files

## Model-Driven Tool Tiering

Your jcodemunch-mcp server narrows the exposed tool list based on the model you are running as. To avoid wasting requests on primitives when a composite would do, always include `model="<your-model-id>"` in your opening `plan_turn` call.

Replace `<your-model-id>` with your active model:
- Claude Opus variants → `claude-opus-4-7` (or any `claude-opus-*`)
- Claude Sonnet variants → `claude-sonnet-4-6`
- Claude Haiku variants → `claude-haiku-4-5`
- GPT-4o / GPT-5 / o1 / Llama → use the model id as printed by your runner

The `model=` parameter rides on the existing `plan_turn` call — it does **not** add a separate tool invocation. If `plan_turn` is not appropriate for a non-code task, call `announce_model(model="...")` once instead.
