## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-24 - Hero Image LCP Bottleneck
**Learning:** The hero logo was a 2.9MB PNG displayed at 150px height. This unoptimized asset severely impacts Largest Contentful Paint (LCP) and bandwidth. Static assets in Docusaurus are not automatically optimized/resized by default loaders for usage in React components if imported as URL.
**Action:** Manually resize/optimize large static assets used in critical paths (above the fold) or use a Docusaurus plugin for image optimization if applicable. Always check intrinsic size of hero images.
