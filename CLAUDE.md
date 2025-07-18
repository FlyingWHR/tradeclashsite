# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trade Clash is a static marketing website for "the world's first real news powered multi-agent economic simulation game." The site uses pure HTML, CSS, and JavaScript with no build tools or package manager.

## Development Commands

Since this is a static site with no build system:
- **Run locally**: Open `index.html` in a browser or use a local web server (e.g., `python -m http.server`)
- **Deploy**: Push to `main` branch (automatically deployed via GitHub Pages to tradeclash.xyz)
- **No installation required**: No dependencies to install

## Architecture & Code Structure

### File Organization
```
├── index.html      # Single-page application with all content
├── terms.html      # Terms of service page
├── styles.css      # All styling (single file)
├── script.js       # All JavaScript functionality (single file)
├── images/         # All image assets with descriptive names
└── 0611.webm      # Hero background video
```

### CSS Architecture
- **Design tokens**: Use CSS variables in `:root` for colors, fonts, and sizes
- **Naming convention**: BEM-like structure (`.section-container`, `.hero-title`)
- **Animation approach**: Extensive keyframes for cyberpunk aesthetic (flicker, glitch effects)
- **Responsive breakpoints**: 1440px, 1024px, 768px (mobile-first)

### JavaScript Patterns
- **Initialization pattern**: All features initialized in DOMContentLoaded
- **Function naming**: verb + noun (e.g., `initHeroVideo()`, `createParticle()`)
- **Performance**: Use Intersection Observer for scroll animations, throttle scroll events
- **Animation timing**: Use requestAnimationFrame for smooth animations

### Visual Design Language
- **Theme**: Dark cyberpunk with teal/cyan accents (#011415 primary background)
- **Effects**: Flicker animations on titles, rolling avatars, floating cards
- **Typography**: DIN Alternate for headers, Inter/Chakra Petch for body
- **Interactivity**: All interactive elements have hover states with theme-appropriate effects

## Key Development Guidelines

1. **Maintain single-file approach**: Keep all CSS in styles.css and JS in script.js
2. **Use existing design tokens**: Always use CSS variables for colors and spacing
3. **Follow animation patterns**: New features should include appropriate cyberpunk effects
4. **Test responsive behavior**: Ensure all features work across breakpoints
5. **Optimize performance**: Use GPU-accelerated transforms, throttle scroll events
6. **No external dependencies**: Avoid adding libraries or frameworks

## Common Tasks

### Adding a New Section
1. Add HTML structure in index.html following existing section patterns
2. Style using existing CSS variables and animation keyframes
3. If interactive, add initialization function following the `init*()` pattern
4. Update navigation if needed

### Creating New Animations
1. Define keyframes in styles.css following naming convention
2. Apply with appropriate timing functions (use cubic-bezier for smooth effects)
3. Consider performance impact - prefer transform/opacity over position/size

### Updating Content
- Images go in `/images/` with descriptive names
- Follow existing naming patterns (e.g., `leader-avatar-*.png`, `news-icon-*.png`)
- Maintain consistent file formats (PNG for images, WebM for videos)

## Notes
- Site auto-deploys to tradeclash.xyz via GitHub Pages on push to main
- No linting or testing setup - manual testing in browsers required
- Easter egg: Konami code (↑↑↓↓←→←→BA) triggers special effect