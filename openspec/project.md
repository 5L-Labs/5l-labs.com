# Project Context

## Purpose
The 5L Labs website (5l-labs.com) serves as the central hub for 5L Labs, LLC, a "Commercial Privacy First" consultancy and research lab. 
It hosts multiple specialized blogs focused on:
- Self-Hosted IoT
- Applied Home ML IoT
- Applied AI Engineering
- Frontier Research

The site also showcases products/projects (Open Embeddings, Recruiter Rankings, Overlord Network Kill Switch) and consulting services.

## Tech Stack
- **Framework**: [Docusaurus v3](https://docusaurus.io/) (React-based static site generator)
- **Frontend**: React 19, MDX
- **Styling**: Tailwind CSS (v3), Infima (Docusaurus default)
- **Runtime**: Node.js (>=18.0)
- **Package Manager**: Yarn (preferred) or Bun (lockfile present)
- **Diagrams**: Mermaid.js
- **Utilities**: Python (for embedding generation scripts)

## Project Conventions

### Code Style
- **Formatting**: Prettier (implied by standard Docusaurus setup).
- **Linting**: ESLint (standard Docusaurus config).
- **CSS**: Tailwind CSS utility classes are preferred for custom styling. Custom CSS variables (CSS modules) are defined in `src/css/custom.css` and mapped in `tailwind.config.js`.

### Architecture Patterns
- **Multi-Blog Setup**: The site uses the `@docusaurus/plugin-content-blog` plugin multiple times to support distinct blog sections (e.g., `blog-self-hosted-iot`, `blog-applied-ai-engineering`).
- **Standard Docusaurus Structure**:
    - `src/`: React components, pages, and custom CSS.
    - `static/`: Static assets (images, embeddings).
    - `docs/`: Documentation content.
    - `blog-*/`: Content for specific blog instances.
- **Embeddings**: Custom scripts (`scripts/generate_embeddings.py`) generate embeddings from content, which are served statically.

### Testing Strategy
- **Continuous Integration**: GitHub Actions (`.github/workflows`) are used for testing builds (`render-test.yml`) and deployment (`render.yml`, `gemini-dispatch.yml`).
- **Local Testing**: `yarn start` for local development with hot reloading. `yarn build` to verify production builds.

### Git Workflow
- Standard branching strategy (main/master as production).
- Commits likely follow conventional commits.

## Domain Context
- **Privacy First**: Strong emphasis on local control, self-hosting, and private AI/IoT solutions.
- **Home Automation**: extensive content on Home Assistant, Tasmota, Zigbee, and private network controls.
- **AI/ML**: Focus on applied engineering and "frontier" research, particularly offline/private LLMs and embeddings.

## Important Constraints
- **Static Site**: The output is static HTML/JS/CSS. Dynamic features must be client-side or build-time generated.
- **Deployment**: Configured for Render and/or GitHub Pages.

## External Dependencies
- **Google Analytics**: `gtag` plugin is configured (`G-P85W9ZNZTP`).
- **Search**: (Potential) Algolia DocSearch or local search (needs verification).
- **Python**: Required for `scripts/generate_embeddings.py`.