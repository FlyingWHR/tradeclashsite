# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trade Clash is a static marketing website for a real-news-powered multi-agent economic simulation game. Pure HTML/CSS/JS — no build tools, no package manager, no frameworks.

## Development

- **Run locally**: `python -m http.server` (or any static file server), then open `http://localhost:8000`
- **Deploy**: Push to `main` — GitHub Actions deploys to GitHub Pages automatically
- **Live site**: https://tradeclash.xyz (custom domain via CNAME file)
- **Simulation app**: https://sim.tradeclash.xyz/ (separate project, linked from CTA)

## Architecture

Three files hold all the code:

- **index.html** (~340 lines) — Single page with all sections: Hero, TLDR, Leaders, News Feed, Engine, CTA, Footer
- **styles.css** (~1300 lines) — All styles in one file. Design tokens as CSS variables in `:root`. Heavy use of keyframe animations for cyberpunk aesthetic (flicker, glitch, float effects)
- **script.js** (~1100 lines) — All JS in one file. Initializes in `DOMContentLoaded` via `init*()` functions: smooth scrolling, leader avatars, news feed, scroll-triggered animations (Intersection Observer), particle effects, CTA buttons, flicker effects, hero video

Supporting assets: `images/` (PNG), `fonts/` (Hanson-Bold TTF/OTF), `0611.webm` (hero background video), `terms.html`.

## Key Design Tokens

```css
--bg-primary: #011415;      /* Dark teal-black background */
--bg-secondary: #051616;
--bg-tertiary: #0f1e1e;
--text-primary: #ffffff;
--text-secondary: #ffffffa8;
--font-display: 'Hanson-Bold', 'DIN Alternate', sans-serif;
--font-body: 'Inter', sans-serif;
```

Google Fonts loads Chakra Petch. Hanson-Bold is self-hosted in `fonts/`.

## Guidelines

- **No external dependencies** — no npm, no CDN libraries, no frameworks
- **Single-file approach** — all CSS in styles.css, all JS in script.js
- **Always use CSS variables** for colors, fonts, and sizes — never hardcode values
- **Animations**: prefer `transform`/`opacity` for GPU acceleration; use `requestAnimationFrame` for JS animations; use Intersection Observer for scroll triggers
- **Responsive breakpoints**: 1440px, 1024px, 768px
- **Easter egg**: Konami code (↑↑↓↓←→←→BA) triggers a special effect
