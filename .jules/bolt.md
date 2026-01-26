## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.
