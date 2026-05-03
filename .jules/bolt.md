# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-22 - Static Image Formats
**Learning:** The Docusaurus React setup efficiently handles direct WebP imports in `src/pages/index.js`, dropping the hero banner LCP image payload by ~85% (233KB -> 35KB) without needing additional Webpack loader configurations.
**Action:** Default to `.webp` formats for large static UI elements (like logos or hero images) rather than `.png`.

## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-10-26 - Implicit Dependency Upgrades with Bun
**Learning:** `bun install` may implicitly upgrade major versions of dependencies (e.g., React 18 to 19) if `package.json` ranges allow it and the lockfile isn't respected or is regenerated. This can cause massive, out-of-scope diffs.
**Action:** Always verify `bun.lock` diffs after installation. Revert lockfile changes if they are not intended.

## 2025-05-24 - Hero Image Optimization & CLS
**Learning:** Large unoptimized images in the hero section are a primary cause of slow LCP and CLS. Providing explicit `width` and `height` attributes to the `img` tag, even if overridden by CSS, allows the browser to reserve the correct aspect ratio space immediately.
**Action:** Always optimize hero images (compress/resize) and define explicit dimensions to prevent layout shifts.

## 2026-02-23 - Python HTTP Connection Pooling
**Learning:** Using standalone `requests.get()` and `requests.post()` in a loop to fetch multiple URLs or hit an API causes a new TCP/TLS handshake per request, leading to massive latency overhead for large jobs.
**Action:** Always refactor iterative network operations to use a shared `requests.Session()` passed down via arguments to implement Keep-Alive connection pooling.

## 2026-05-24 - Redundant Embedding Generation
**Learning:** Checking for the existence of previously generated embedding files (e.g., via `file_path.exists()`) before executing network requests to fetch page content and API calls to generate embeddings avoids O(N) redundant operations, yielding a massive speedup on repeated script executions.
**Action:** Always implement a caching or existence-check mechanism for expensive batch processing scripts where inputs map deterministically to outputs.
